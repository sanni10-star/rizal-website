import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../public/img/categories/securite");
const outCategory = path.join(__dirname, "../public/img/categories/securite-villa.jpg");
const outHero = path.join(__dirname, "../public/img/categories/securite-hero.jpg");

fs.mkdirSync(srcDir, { recursive: true });

/**
 * Sources vérifiées visuellement (juin 2025) :
 * - Hikvision bullet blanc ColorVu 4MP (securimport 23932)
 * - Kit alarme AX PRO complet (securimport 28426)
 * - Détecteur fumée Hikvision (securimport 23126)
 * - Imou Cruiser Dual 2 10MP (imou.com.pk — photo produit officielle)
 */
const SOURCES = {
  "hikvision-colorvu": {
    urls: [
      "https://www.securimport.com/web/image/product.template/23932/image_1920?unique=3460557",
      "https://www.securimport.com/web/image/product.template/34313/image_1920?unique=4124252",
    ],
    stripBg: "white",
    cardFit: "contain",
    cardFill: 0.96,
    cardSize: [960, 720],
  },
  "hikvision-ax-pro": {
    urls: [
      "https://www.securimport.com/web/image/product.template/28426/image_1920?unique=6082a",
      "https://www.securimport.com/web/image/product.template/20788/image_1920?unique=612a9fc",
    ],
    stripBg: "white",
    cardFit: "contain",
    cardFill: 0.94,
    cardSize: [960, 720],
  },
  "hikvision-fumee": {
    urls: [
      "https://www.securimport.com/web/image/product.template/23126/image_1920?unique=4124252",
    ],
    stripBg: "white",
    cardFit: "contain",
    cardFill: 0.98,
    cardSize: [960, 720],
  },
  "imou-cruiser-dual": {
    urls: [
      "https://www.imou.com.pk/wp-content/uploads/2025/01/Cruiser-Dual-10MP-Smart-Wifi-CCTV-Security-Camera.webp",
      "https://www.imou.com.pk/wp-content/uploads/2025/01/Cruiser-Dual-10MP-Smart-Wifi-CCTV-Security-Camera-600x600.webp",
    ],
    stripBg: "white",
    cardFit: "cover",
    cardSize: [960, 720],
    cardFromRaw: true,
  },
};

async function download(url) {
  const r = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: url.includes("securimport")
        ? "https://www.securimport.com/"
        : url.includes("imou.com.pk")
          ? "https://www.imou.com.pk/"
          : "https://store.imou.com/",
    },
  });
  if (!r.ok) return null;
  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("image") && !url.includes(".jpg")) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  return buf.length > 5000 ? buf : null;
}

async function stripBackground(buf, mode) {
  if (mode === "none") {
    return sharp(buf).ensureAlpha().png().toBuffer();
  }

  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const avg = (r + g + b) / 3;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);

    let kill = false;
    if (mode === "white" || mode === "light") {
      kill = avg > 245 && spread < 12;
    } else if (mode === "black") {
      kill = avg < 40 && spread < 30;
    }

    if (kill) pixels[i + 3] = 0;
    else if ((mode === "white" || mode === "light") && avg > 235 && spread < 10) {
      pixels[i + 3] = Math.min(pixels[i + 3], Math.round((255 - avg) * 12));
    }
  }

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();
}

async function loadSource(key, cfg) {
  let raw;
  if (cfg.localFlyer) {
    if (!fs.existsSync(cfg.localFlyer)) throw new Error(`missing ${cfg.localFlyer}`);
    raw = fs.readFileSync(cfg.localFlyer);
  } else {
    for (const url of cfg.urls) {
      raw = await download(url);
      if (raw) break;
    }
    if (!raw) throw new Error(`download failed for ${key}`);
  }

  if (cfg.crop) {
    const meta = await sharp(raw).metadata();
    const { leftPct, topPct, widthPct, heightPct } = cfg.crop;
    raw = await sharp(raw)
      .extract({
        left: Math.round(meta.width * leftPct),
        top: Math.round(meta.height * topPct),
        width: Math.round(meta.width * widthPct),
        height: Math.round(meta.height * heightPct),
      })
      .toBuffer();
  }

  if (cfg.cardFromRaw) {
    fs.writeFileSync(path.join(srcDir, `${key}-source.webp`), raw);
  }
  const png = await stripBackground(raw, cfg.stripBg);
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

async function fitProduct(key, w, h, fill = 0.95) {
  const meta = await sharp(path.join(srcDir, `${key}.png`)).metadata();
  const scale = Math.min((w * fill) / meta.width, (h * fill) / meta.height);
  return sharp(path.join(srcDir, `${key}.png`))
    .resize(Math.round(meta.width * scale), Math.round(meta.height * scale), { fit: "inside" })
    .png()
    .toBuffer();
}

async function withShadow(buf) {
  const meta = await sharp(buf).metadata();
  const pad = 16;
  const sw = meta.width + pad * 2;
  const sh = meta.height + pad + 28;
  const shadow = Buffer.from(`
<svg width="${sw}" height="${sh}" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="b"><feGaussianBlur stdDeviation="8"/></filter></defs>
  <ellipse cx="${sw / 2}" cy="${sh - 10}" rx="${meta.width * 0.34}" ry="12" fill="#000" opacity="0.1" filter="url(#b)"/>
</svg>`);
  return sharp({
    create: { width: sw, height: sh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([
      { input: shadow, top: 0, left: 0 },
      { input: buf, top: 0, left: pad },
    ])
    .png()
    .toBuffer();
}

/** Carte 960×540 : cover ou contain selon le produit */
async function buildFillCard(key) {
  const cfg = SOURCES[key];
  const pngPath = path.join(srcDir, `${key}.png`);
  if (!fs.existsSync(pngPath)) return;

  const fit = cfg.cardFit ?? "cover";
  const fill = cfg.cardFill ?? 0.96;
  const [cardW, cardH] = cfg.cardSize ?? [960, 540];

  let card;
  if (cfg.cardFromRaw) {
    const rawPath = path.join(srcDir, `${key}-source.webp`);
    const input = fs.existsSync(rawPath) ? rawPath : pngPath;
    card = await sharp(input)
      .resize(cardW, cardH, { fit: "cover", position: "centre" })
      .jpeg({ quality: 96 })
      .toBuffer();
  } else if (fit === "contain") {
    const trimmed = await sharp(pngPath).trim({ threshold: 8 }).png().toBuffer();
    const meta = await sharp(trimmed).metadata();
    const scale = Math.min((cardW * fill) / meta.width, (cardH * fill) / meta.height);
    const resized = await sharp(trimmed)
      .resize(Math.round(meta.width * scale), Math.round(meta.height * scale))
      .png()
      .toBuffer();
    card = await sharp({
      create: { width: cardW, height: cardH, channels: 3, background: { r: 255, g: 255, b: 255 } },
    })
      .composite([{ input: resized, gravity: "centre" }])
      .jpeg({ quality: 96 })
      .toBuffer();
  } else {
    const trimmed = await sharp(pngPath).trim({ threshold: 8 }).png().toBuffer();
    card = await sharp(trimmed)
      .resize(cardW, cardH, { fit: "cover", position: "centre" })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 96 })
      .toBuffer();
  }

  fs.writeFileSync(path.join(srcDir, `${key}-card.jpg`), card);
}

const shieldSvg = Buffer.from(`
<svg width="1200" height="820" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="s" cx="50%" cy="45%" r="58%">
      <stop offset="0%" stop-color="#7eb8e8" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#3d6a9a" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="600" cy="360" rx="520" ry="290" fill="url(#s)"/>
  <path d="M60,440 C220,320 420,360 600,400 C780,440 980,360 1140,440" fill="none" stroke="#8fd4f0" stroke-width="22" opacity="0.28" stroke-linecap="round"/>
</svg>`);

const axPro = await withShadow(await fitProduct("hikvision-ax-pro", 380, 300));
const fumee = await withShadow(await fitProduct("hikvision-fumee", 300, 300));
const colorvu = await withShadow(await fitProduct("hikvision-colorvu", 460, 460));
const imou = await withShadow(await fitProduct("imou-cruiser-dual", 380, 520));

const portrait = await sharp({
  create: { width: 1200, height: 1600, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: shieldSvg, top: 260, left: 0 },
    { input: axPro, top: 380, left: 60 },
    { input: colorvu, top: 390, left: 620 },
    { input: fumee, top: 600, left: 100 },
    { input: imou, top: 610, left: 680 },
  ])
  .jpeg({ quality: 95 })
  .toBuffer();
fs.writeFileSync(outCategory, portrait);

const axProL = await withShadow(await fitProduct("hikvision-ax-pro", 420, 340));
const colorvuL = await withShadow(await fitProduct("hikvision-colorvu", 500, 500));
const fumeeL = await withShadow(await fitProduct("hikvision-fumee", 320, 320));
const imouL = await withShadow(await fitProduct("imou-cruiser-dual", 420, 520));

const landscape = await sharp({
  create: { width: 2400, height: 1200, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: shieldSvg, top: 80, left: 500 },
    { input: axProL, top: 290, left: 160 },
    { input: colorvuL, top: 290, left: 1040 },
    { input: fumeeL, top: 350, left: 1640 },
    { input: imouL, top: 320, left: 1920 },
  ])
  .jpeg({ quality: 95 })
  .toBuffer();
fs.writeFileSync(outHero, landscape);

for (const key of Object.keys(SOURCES)) {
  await buildFillCard(key);
}

console.log("done", outCategory, portrait.length);
