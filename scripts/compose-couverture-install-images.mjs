import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsDir = path.join(__dirname, "../public/img/piscine/couverture/products");
const installDir = path.join(__dirname, "../public/img/piscine/couverture/install");

fs.mkdirSync(installDir, { recursive: true });

const keys = ["non-bordee", "bordee-2", "bordee-4", "geobubble-400", "geobubble-500"];

async function toInstall(buf, key) {
  let pipeline = sharp(buf);
  if (key.startsWith("geobubble")) {
    const { width, height } = await sharp(buf).metadata();
    pipeline = sharp(buf).extract({
      left: 0,
      top: Math.round(height * 0.32),
      width,
      height: Math.round(height * 0.68),
    });
  }
  return pipeline
    .resize(1920, 820, { fit: "cover", position: "centre" })
    .jpeg({ quality: 92 })
    .toBuffer();
}

for (const key of keys) {
  const src = path.join(productsDir, `${key}.jpg`);
  if (!fs.existsSync(src)) {
    console.error("missing", src);
    continue;
  }
  const out = await toInstall(fs.readFileSync(src), key);
  const dst = path.join(installDir, `${key}-install.jpg`);
  fs.writeFileSync(dst, out);
  const m = await sharp(out).metadata();
  console.log("saved", key, `${m.width}x${m.height}`, out.length);
}
