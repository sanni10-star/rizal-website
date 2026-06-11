import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../public/img/piscine/traitement/products");

// Bricoland watermark sits on the bottom band — crop ~22% height.
const CROP_RATIO = 0.78;
const SKIP = new Set(["chlore-poudre-rizal.jpg"]);

for (const name of fs.readdirSync(dir)) {
  if (SKIP.has(name)) continue;
  const file = path.join(dir, name);
  const { width, height } = await sharp(file).metadata();
  const newH = Math.round(height * CROP_RATIO);
  const buf = await sharp(file)
    .extract({ left: 0, top: 0, width, height: newH })
    .toBuffer();

  const tmp = file + ".tmp";
  const out = name.endsWith(".png")
    ? sharp(buf).png()
    : sharp(buf).jpeg({ quality: 92 });

  await out.toFile(tmp);
  fs.renameSync(tmp, file);
  console.log("cropped", name, `${width}x${height} → ${width}x${newH}`);
}
