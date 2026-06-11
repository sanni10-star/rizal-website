import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/categories/automatisation");

async function optimizeCard(key, width, height) {
  const src = path.join(outDir, `${key}.png`);
  if (!fs.existsSync(src)) {
    console.error("missing", src);
    return;
  }
  const out = await sharp(src)
    .trim({ threshold: 12 })
    .resize(width, height, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 94 })
    .toBuffer();
  const dst = path.join(outDir, `${key}-card.jpg`);
  fs.writeFileSync(dst, out);
  const meta = await sharp(out).metadata();
  console.log("card", key, `${meta.width}x${meta.height}`, out.length);
}

await optimizeCard("euromatic-techno", 960, 540);
await optimizeCard("key-coulissant", 960, 540);
