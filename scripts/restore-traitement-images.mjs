import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/piscine/traitement/products");
fs.mkdirSync(outDir, { recursive: true });

// Masquer uniquement la fine bande "www.bricoland.ma" (~7 % bas) — pas de trim.
const WATERMARK_BAND = 0.095;

const pages = [
  { key: "chlore-poudre-astral", url: "https://bricoland.ma/chlore-en-poudre-5kg.html" },
  { key: "chlore-pastille", url: "https://bricoland.ma/chlore-en-galets-astralpool.html" },
  { key: "chlore-choc", url: "https://bricoland.ma/chlore-choc-v60-5kg-granule.html" },
  { key: "anti-algue", url: "https://bricoland.ma/anti-algues-5l-astralpool.html" },
  { key: "floculant", url: "https://bricoland.ma/floculant-liquide-5l-ocedis.html" },
  { key: "ph-moins", url: "https://bricoland.ma/ph-poudre-5kg-ocedis.html" },
  { key: "anti-calcaire", url: "https://bricoland.ma/anticalcaire-liquide-5l-ocedis-ocedis.html" },
];

function pickImages(html) {
  return [...html.matchAll(/https:\/\/bricoland\.ma\/media\/catalog\/product\/[^"'\s>]+\.(?:jpg|jpeg|png)/gi)]
    .map((m) => m[0].split("?")[0])
    .filter((u) => u.includes("/image/9df78eab") || u.includes("/image/720x799"));
}

async function coverWatermark(buf) {
  const { width, height } = await sharp(buf).metadata();
  const bandH = Math.max(32, Math.round(height * WATERMARK_BAND));
  const whiteBand = await sharp({
    create: { width, height: bandH, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .png()
    .toBuffer();

  return sharp(buf)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .composite([{ input: whiteBand, top: height - bandH, left: 0 }])
    .jpeg({ quality: 93 })
    .toBuffer();
}

for (const p of pages) {
  const r = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) {
    console.log("FAIL", p.key, r.status);
    continue;
  }
  const html = await r.text();
  const imgs = pickImages(html);
  if (!imgs[0]) {
    console.log("NO IMG", p.key);
    continue;
  }
  const ir = await fetch(imgs[0], { headers: { "User-Agent": "Mozilla/5.0", Referer: p.url } });
  const raw = Buffer.from(await ir.arrayBuffer());
  const out = await coverWatermark(raw);
  const dst = path.join(outDir, `${p.key}.jpg`);
  fs.writeFileSync(dst, out);
  const meta = await sharp(out).metadata();
  console.log("ok", p.key, `${meta.width}x${meta.height}`);
}
