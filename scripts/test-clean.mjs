import fs from "fs";
import sharp from "sharp";

async function cleanWhiteBg(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const avg = (r + g + b) / 3;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    if (avg > 242 && spread < 18) pixels[i + 3] = 0;
    else if (avg > 230 && spread < 12) pixels[i + 3] = Math.min(pixels[i + 3], Math.round((255 - avg) * 8));
    else if (avg < 45 && spread < 30) pixels[i + 3] = 0;
  }
  return sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 8 })
    .png()
    .toBuffer();
}

const cam = fs.readFileSync("public/img/categories/securite/probe/test-7336.jpg");
const cleaned = await cleanWhiteBg(cam);
await sharp(cleaned).jpeg({ quality: 95 }).toFile("public/img/categories/securite/probe/cam-cleaned.jpg");
console.log("done", cleaned.length);
