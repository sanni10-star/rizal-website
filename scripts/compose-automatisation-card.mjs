import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../public/img/categories/automatisation");

const euromatic = await sharp(path.join(srcDir, "euromatic-techno.png"))
  .resize(720, 480, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const key = await sharp(path.join(srcDir, "key-coulissant.png"))
  .resize(720, 480, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

/** Carte accueil — portrait 3/4 */
const cardPortrait = await sharp({
  create: { width: 1200, height: 1600, channels: 3, background: { r: 18, g: 26, b: 46 } },
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="1200" height="1600"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2744"/><stop offset="50%" stop-color="#121a2e"/><stop offset="100%" stop-color="#0b0f1c"/></linearGradient></defs><rect width="1200" height="1600" fill="url(#g)"/></svg>`,
      ),
      top: 0,
      left: 0,
    },
    { input: euromatic, left: 60, top: 520 },
    { input: key, left: 420, top: 520 },
  ])
  .jpeg({ quality: 93 })
  .toBuffer();

fs.writeFileSync(
  path.join(__dirname, "../public/img/categories/automatisation-eau-portail.jpg"),
  cardPortrait,
);

/** Hero page service — paysage 21/9 */
const cardLandscape = await sharp({
  create: { width: 2400, height: 1200, channels: 3, background: { r: 14, g: 22, b: 42 } },
})
  .composite([
    {
      input: Buffer.from(
        `<svg width="2400" height="1200"><defs><linearGradient id="h" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1b2a4a"/><stop offset="55%" stop-color="#121a2e"/><stop offset="100%" stop-color="#0b0f1c"/></linearGradient></defs><rect width="2400" height="1200" fill="url(#h)"/></svg>`,
      ),
      top: 0,
      left: 0,
    },
    { input: euromatic, left: 280, top: 280 },
    { input: key, left: 1280, top: 280 },
  ])
  .jpeg({ quality: 93 })
  .toBuffer();

fs.writeFileSync(
  path.join(__dirname, "../public/img/categories/automatisation-hero.jpg"),
  cardLandscape,
);

console.log("composed portrait + landscape hero");
