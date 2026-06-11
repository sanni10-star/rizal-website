import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../public/img/piscine/traitement/products");

const files = ["anti-calcaire.png", "floculant.png", "ph-moins.png"];

for (const name of files) {
  const src = path.join(dir, name);
  if (!fs.existsSync(src)) {
    console.log("skip", name);
    continue;
  }

  const key = name.replace(".png", ".jpg");
  const dst = path.join(dir, key);

  const buf = await sharp(src)
    .trim({ threshold: 12, background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 93 })
    .toBuffer();

  const { width, height } = await sharp(buf).metadata();
  const bandH = Math.max(36, Math.round(height * 0.1));
  const whiteBand = await sharp({
    create: { width, height: bandH, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .png()
    .toBuffer();

  await sharp(buf)
    .composite([{ input: whiteBand, top: height - bandH, left: 0 }])
    .jpeg({ quality: 93 })
    .toFile(dst);

  fs.unlinkSync(src);
  const meta = await sharp(dst).metadata();
  console.log("ok", key, `${meta.width}x${meta.height}`);
}
