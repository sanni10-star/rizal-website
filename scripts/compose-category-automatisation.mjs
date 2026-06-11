import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../public/img/categories/automatisation");
const outCategory = path.join(
  __dirname,
  "../public/img/categories/automatisation-eau-portail.jpg",
);
const outHero = path.join(__dirname, "../public/img/categories/automatisation-hero.jpg");

fs.mkdirSync(srcDir, { recursive: true });

const SOURCES = {
  "euromatic-techno": [
    "https://euromaticgate.net/wp-content/uploads/2020/10/DSC_0019_Techno-1.jpg",
    "https://euromaticgate.net/wp-content/uploads/2021/03/techno.png",
  ],
  "key-coulissant": [
    "https://ps.automatismes.net/11314-thickbox_default/key-automation-tus62.jpg",
    "https://ps.automatismes.net/11251-thickbox_default/kit-coulissant-key-automation-turbo-tus62.jpg",
    "https://www.key-automation.com/4116-thickbox_default/999cast004a00.jpg",
  ],
};

async function download(url, referer) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: referer },
  });
  if (!r.ok) return null;
  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("image")) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  return buf.length > 8000 ? buf : null;
}

/** Fond blanc → transparent, sans toucher aux gris produit */
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

      if (avg > 242 && spread < 18) {
        pixels[i + 3] = 0;
      } else if (avg > 230 && spread < 12) {
        pixels[i + 3] = Math.min(pixels[i + 3], Math.round((255 - avg) * 8));
      }
    }
  }

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();
}

/** Key TUS62 — image propre (moteur seul ou recadrage kit) */
async function buildKeyProduct(buf, fromKit = false) {
  const meta = await sharp(buf).metadata();
  let src = buf;
  if (fromKit) {
    src = await sharp(buf)
      .extract({
        left: Math.round(meta.width * 0.18),
        top: Math.round(meta.height * 0.02),
        width: Math.round(meta.width * 0.64),
        height: Math.round(meta.height * 0.52),
      })
      .toBuffer();
  } else {
    src = await sharp(buf)
      .extract({
        left: Math.round(meta.width * 0.08),
        top: Math.round(meta.height * 0.05),
        width: Math.round(meta.width * 0.72),
        height: Math.round(meta.height * 0.88),
      })
      .toBuffer();
  }

  const cleaned = await cleanWhiteBg(src);
  const out = path.join(srcDir, "key-coulissant.png");
  fs.writeFileSync(out, cleaned);
  return cleaned;
}

for (const [key, urls] of Object.entries(SOURCES)) {
  let raw = null;
  let usedUrl = "";
  for (const url of urls) {
    raw = await download(
      url,
      url.includes("automatismes")
        ? "https://www.automatismes.net/"
        : url.includes("key")
          ? "https://www.key-automation.com/"
          : "https://euromaticgate.net/",
    );
    if (raw) {
      usedUrl = url;
      break;
    }
  }
  if (!raw) {
    console.error("fetch failed", key);
    continue;
  }

  if (key === "key-coulissant") {
    await buildKeyProduct(raw, usedUrl.includes("kit-"));
  } else {
    const cleaned = await cleanWhiteBg(raw);
    fs.writeFileSync(path.join(srcDir, `${key}.png`), cleaned);
  }
  console.log("cleaned", key);
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

const splashSvg = Buffer.from(`
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

const euromatic = await withShadow(await fitProduct("euromatic-techno", 1020, 285));
const key = await withShadow(await fitProduct("key-coulissant", 400, 460));
const eMeta = await sharp(euromatic).metadata();

const portrait = await sharp({
  create: { width: 1200, height: 1600, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: splashSvg, top: 260, left: 0 },
    { input: euromatic, top: 340, left: 30 },
    { input: key, top: 420, left: 740 },
  ])
  .jpeg({ quality: 95 })
  .toBuffer();

fs.writeFileSync(outCategory, portrait);

const euromaticL = await withShadow(await fitProduct("euromatic-techno", 1080, 300));
const keyL = await withShadow(await fitProduct("key-coulissant", 500, 360));

const landscape = await sharp({
  create: { width: 2400, height: 1200, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: splashSvg, top: 80, left: 500 },
    { input: euromaticL, top: 260, left: 220 },
    { input: keyL, top: 380, left: 1520 },
  ])
  .jpeg({ quality: 95 })
  .toBuffer();

fs.writeFileSync(outHero, landscape);

const euromaticCard = await sharp(path.join(srcDir, "euromatic-techno.png"))
  .resize(960, 540, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
  .jpeg({ quality: 94 })
  .toBuffer();
fs.writeFileSync(path.join(srcDir, "euromatic-techno-card.jpg"), euromaticCard);

const kitUrl = "https://ps.automatismes.net/11251-thickbox_default/kit-coulissant-key-automation-turbo-tus62.jpg";
const kitRaw = await download(kitUrl, "https://www.automatismes.net/");
if (kitRaw) {
  const keyCard = await sharp(kitRaw)
    .resize(960, 540, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 94 })
    .toBuffer();
  fs.writeFileSync(path.join(srcDir, "key-coulissant-card.jpg"), keyCard);
}

console.log("done", outCategory, portrait.length);
