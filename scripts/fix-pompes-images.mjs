import fs from "fs";
import sharp from "sharp";

const src = "public/img/categories/pompes/ecwat-surpresseur.png";
const flat = await sharp({
  create: { width: 1200, height: 1200, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([{ input: src, gravity: "centre" }])
  .jpeg()
  .toBuffer();

const cropped = await sharp(flat)
  .extract({
    left: 0,
    top: Math.round(1200 * 0.15),
    width: Math.round(1200 * 0.55),
    height: Math.round(1200 * 0.7),
  })
  .toBuffer();

const meta = await sharp(cropped).metadata();
const fill = 0.96;
const scale = Math.min((960 * fill) / meta.width, (720 * fill) / meta.height);
const resized = await sharp(cropped)
  .resize(Math.round(meta.width * scale), Math.round(meta.height * scale))
  .toBuffer();

const card = await sharp({
  create: { width: 960, height: 720, channels: 3, background: { r: 255, g: 255, b: 255 } },
})
  .composite([{ input: resized, gravity: "centre" }])
  .jpeg({ quality: 96 })
  .toBuffer();
fs.writeFileSync("public/img/categories/pompes/ecwat-surpresseur-card.jpg", card);

const overlay = Buffer.from(
  `<svg width="2400" height="1200"><rect width="2400" height="1200" fill="rgba(15,23,42,0.45)"/></svg>`,
);
const hero = await sharp("public/img/categories/pompes-hero.jpg")
  .modulate({ brightness: 0.92 })
  .composite([{ input: overlay, blend: "over" }])
  .jpeg({ quality: 95 })
  .toBuffer();
fs.writeFileSync("public/img/categories/pompes-hero.jpg", hero);

console.log("done");
