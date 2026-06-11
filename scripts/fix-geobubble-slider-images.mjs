import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/piscine/couverture/products");

const SOURCES = {
  "geobubble-400": "https://www.allswimltd.com/images/thumbs/0010345_geobubble-400-micron-light-blue-solar-covers.jpeg",
  "geobubble-500": "https://www.allswimltd.com/images/thumbs/0010347_geobubble-500-micron-dark-blue-solar-covers.jpeg", // fallback: 400 source
};

async function download(url) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.allswimltd.com/" },
  });
  if (!r.ok) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  return buf.length > 10000 ? buf : null;
}

/** Recadre la zone bleue pour remplir le cadre slider (comme non-bordee / bordee) */
async function toSliderImage(buf, key) {
  const meta = await sharp(buf).metadata();
  const w = meta.width;
  const h = meta.height;

  const out = await sharp(buf)
    .extract({
      left: 0,
      top: Math.round(h * 0.38),
      width: Math.round(w * 0.82),
      height: Math.round(h * 0.62),
    })
    .rotate(-8, { background: { r: 255, g: 255, b: 255 } })
    .resize(900, 675, { fit: "cover", position: "centre" })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 93 })
    .toBuffer();

  const dst = path.join(outDir, `${key}.jpg`);
  fs.writeFileSync(dst, out);
  const m = await sharp(out).metadata();
  console.log("saved", key, `${m.width}x${m.height}`, out.length);
}

for (const [key, url] of Object.entries(SOURCES)) {
  let buf = await download(url);
  if (!buf) {
    const local = path.join(outDir, `${key}.jpg`);
    if (fs.existsSync(local)) {
      buf = fs.readFileSync(local);
      console.warn("fallback local", key);
    } else {
      console.error("FAILED", key);
      continue;
    }
  }
  await toSliderImage(buf, key);
}
