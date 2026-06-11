import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../public/img/categories/pompes");
const outCategory = path.join(__dirname, "../public/img/categories/pompes-villa.jpg");
const outHero = path.join(__dirname, "../public/img/categories/pompes-hero.jpg");

fs.mkdirSync(srcDir, { recursive: true });

const SOURCES = {
  deversopompes: {
    local: path.join(srcDir, "deversopompes-source.png"),
    cardFill: 0.97,
    cardFit: "contain",
    enhance: true,
  },
  "ecwat-surpresseur": {
    urls: [
      "https://www.ecwat.com/uploads/products/1706609014_pompes-horizontales.webp",
      "https://www.ecwat.com/uploads/products/1706609266_pompes-horizontales.webp",
    ],
    cardFill: 0.94,
  },
};

async function download(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.ecwat.com/" },
  });
  if (!r.ok) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  return buf.length > 3000 ? buf : null;
}

async function cleanWhiteBg(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);
  const w = info.width;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const avg = (r + g + b) / 3;
      const spread = Math.max(r, g, b) - Math.min(r, g, b);

      if (avg > 242 && spread < 18) pixels[i + 3] = 0;
      else if (avg > 230 && spread < 12)
        pixels[i + 3] = Math.min(pixels[i + 3], Math.round((255 - avg) * 8));
    }
  }

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();
}

async function enhanceProduct(buf) {
  return sharp(buf)
    .modulate({ brightness: 1.08, saturation: 1.05 })
    .sharpen({ sigma: 0.8 })
    .png()
    .toBuffer();
}

async function loadSource(key, cfg) {
  let raw;
  if (cfg.local) {
    if (!fs.existsSync(cfg.local)) throw new Error(`missing ${cfg.local}`);
    raw = fs.readFileSync(cfg.local);
  } else {
    for (const url of cfg.urls) {
      raw = await download(url);
      if (raw) break;
    }
    if (!raw) throw new Error(`download failed for ${key}`);
  }

  let png = await cleanWhiteBg(raw);
  if (cfg.enhance) png = await enhanceProduct(png);
  fs.writeFileSync(path.join(srcDir, `${key}.png`), png);
  return png;
}

for (const [key, cfg] of Object.entries(SOURCES)) {
  try {
    await loadSource(key, cfg);
    console.log("saved", key);
  } catch (e) {
    console.error("FAILED", key, e.message);
  }
}

async function fitProduct(key, w, h) {
  return sharp(path.join(srcDir, `${key}.png`))
    .resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function withShadow(buf) {
  const meta = await sharp(buf).metadata();
  const padX = 28;
  const padY = 20;
  const sw = meta.width + padX * 2;
  const sh = meta.height + padY + 36;
  const shadow = Buffer.from(`
<svg width="${sw}" height="${sh}" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="b"><feGaussianBlur stdDeviation="12"/></filter></defs>
  <ellipse cx="${sw / 2}" cy="${sh - 14}" rx="${meta.width * 0.38}" ry="16" fill="#000" opacity="0.13" filter="url(#b)"/>
</svg>`);
  return sharp({
    create: { width: sw, height: sh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: shadow, top: 0, left: 0 },
      { input: buf, top: 0, left: padX },
    ])
    .png()
    .toBuffer();
}

async function buildFillCard(key, cfg = {}) {
  const pngPath = path.join(srcDir, `${key}.png`);
  if (!fs.existsSync(pngPath)) return;

  const fill = cfg.cardFill ?? 0.96;
  const flat = await sharp({
    create: { width: 1200, height: 1200, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite([{ input: pngPath, gravity: "centre" }])
    .jpeg()
    .toBuffer();

  const trimmed = await sharp(flat).trim({ threshold: 12 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const scale = Math.min((960 * fill) / meta.width, (720 * fill) / meta.height);
  const resized = await sharp(trimmed)
    .resize(Math.round(meta.width * scale), Math.round(meta.height * scale))
    .toBuffer();

  const card = await sharp({
    create: { width: 960, height: 720, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .jpeg({ quality: 96 })
    .toBuffer();

  fs.writeFileSync(path.join(srcDir, `${key}-card.jpg`), card);
}

const waterSvg = Buffer.from(`
<svg width="1200" height="820" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="w" cx="50%" cy="45%" r="58%">
      <stop offset="0%" stop-color="#a5e3f7" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#6ec8e8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="600" cy="360" rx="520" ry="290" fill="url(#w)"/>
  <path d="M40,440 C200,300 400,340 600,380 C800,420 1000,340 1160,420" fill="none" stroke="#8fd4f0" stroke-width="30" opacity="0.38" stroke-linecap="round"/>
  <path d="M80,500 C260,390 440,420 620,450 C800,480 980,410 1120,470" fill="none" stroke="#5eb8e0" stroke-width="18" opacity="0.25" stroke-linecap="round"/>
  <ellipse cx="600" cy="540" rx="460" ry="22" fill="#5eb8e0" opacity="0.1"/>
</svg>`);

const deverso = await withShadow(await fitProduct("deversopompes", 420, 520));
const ecwat = await withShadow(await fitProduct("ecwat-surpresseur", 480, 400));

const portrait = await sharp({
  create: { width: 1200, height: 1600, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: waterSvg, top: 260, left: 0 },
    { input: deverso, top: 380, left: 120 },
    { input: ecwat, top: 520, left: 620 },
  ])
  .jpeg({ quality: 95 })
  .toBuffer();
fs.writeFileSync(outCategory, portrait);

const deversoL = await withShadow(await fitProduct("deversopompes", 460, 560));
const ecwatL = await withShadow(await fitProduct("ecwat-surpresseur", 520, 440));

const landscape = await sharp({
  create: { width: 2400, height: 1200, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: waterSvg, top: 80, left: 500 },
    { input: deversoL, top: 280, left: 280 },
    { input: ecwatL, top: 320, left: 1180 },
  ])
  .jpeg({ quality: 95 })
  .toBuffer();
fs.writeFileSync(outHero, landscape);

for (const [key, cfg] of Object.entries(SOURCES)) {
  await buildFillCard(key, cfg);
}

console.log("done", outCategory, portrait.length);
