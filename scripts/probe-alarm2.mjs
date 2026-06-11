import fs from "fs";
import sharp from "sharp";

const urls = [
  ["ipcam64", "https://staticmedia.ipcam-shop.nl/catalog/product/d/s/ds-pwa64-kit-we.png"],
  ["ipcam96", "https://staticmedia.ipcam-shop.nl/catalog/product/d/s/ds-pwa96-kit-we.png"],
  ["ipcam96-4", "https://staticmedia.ipcam-shop.nl/catalog/product/d/s/ds-pwa96-kit-we_4.png"],
  ["mayflex-panel", "https://media.mayflex.com/images/SHIK004/Renders.png.thumb.1280.1280_800px.jpg"],
  ["mayflex-kit", "https://media.mayflex.com/images/SHIK006/Renders.png.thumb.1280.1280_800px.jpg"],
  ["secrig", "https://securigo.eu/9232-tm_large_default/ds-pwa64-l-we-6941264061366.jpg"],
  ["neo-1867", "https://neotechsecurity.com/1867-large_default/ds-pwa64-l-we-6941264061366.jpg"],
  ["neo-1867-2x", "https://neotechsecurity.com/1867-superlarge_default_2x/ds-pwa64-l-we-6941264061366.jpg"],
  ["pir", "https://www.neotechsecurity.com/10403-large_default/detecteur-de-mouvement-sans-fil-hikvision-ds-pdp15p-eg2-we.jpg"],
  ["contact", "https://www.neotechsecurity.com/10404-large_default/contact-magnetique-sans-fil-hikvision-ds-pdmc-eg2-we.jpg"],
];

const out = "public/img/categories/securite/probe";
for (const [n, u] of urls) {
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
    const b = Buffer.from(await r.arrayBuffer());
    if (b.length > 6000) {
      await sharp(b).jpeg().toFile(`${out}/a2-${n}.jpg`);
      console.log("OK", n, b.length);
    } else console.log("skip", n, r.status, b.length);
  } catch (e) {
    console.log("ERR", n, e.message);
  }
}
