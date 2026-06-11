import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
const dst = path.join(
  __dirname,
  "../public/img/piscine/traitement/products/chlore-poudre-rizal.jpg",
);

if (!src) {
  console.error("Usage: node crop-rizal-chlore.mjs <source-image>");
  process.exit(1);
}

const { width, height } = await sharp(src).metadata();
console.log("source", width, height);

// Flyer promo complet — retirer uniquement le bloc prix (entre le seau et le footer).
const cutAfter = Math.round(height * 0.755);
const cutBefore = Math.round(height * 0.885);

const topPart = await sharp(src)
  .extract({ left: 0, top: 0, width, height: cutAfter })
  .toBuffer();

const bottomPart = await sharp(src)
  .extract({ left: 0, top: cutBefore, width, height: height - cutBefore })
  .toBuffer();

const topH = cutAfter;
const botH = height - cutBefore;
const outH = topH + botH;

await sharp({
  create: { width, height: outH, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([
    { input: topPart, top: 0, left: 0 },
    { input: bottomPart, top: topH, left: 0 },
  ])
  .resize(900, Math.round((900 / width) * outH), {
    fit: "inside",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .jpeg({ quality: 93 })
  .toFile(dst);

console.log("saved", dst, `removed ${cutBefore - cutAfter}px price band`);
