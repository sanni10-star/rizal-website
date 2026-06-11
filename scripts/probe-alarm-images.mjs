import fs from "fs";
import sharp from "sharp";

const urls = [
  ["sec-panel", "https://securigo.eu/9232-tm_large_default/ds-pwa64-l-we-6941264061366.jpg"],
  ["sec-panel2", "https://securigo.eu/9232-large_default/ds-pwa64-l-we-6941264061366.jpg"],
  ["sec-kit", "https://staticmedia.ipcam-shop.nl/catalog/product/cache/21284ec6a4c88ec459fa16d20fc22dcb/d/s/ds-pwa96-kit-we_4.png"],
  ["sec-kit2", "https://staticmedia.ipcam-shop.nl/catalog/product/d/s/ds-pwa96-kit-we_4.png"],
  ["neo-10348", "https://www.neotechsecurity.com/10348-large_default/kit-alarme-sans-fil-hikvision-ax-pro-ds-pwa64-kit-we.jpg"],
  ["neo-10400b", "https://www.neotechsecurity.com/10400-large_default/hikvision-ds-pwa64-kit-we.jpg"],
  ["riel-panel", "https://riel.hu/images/products/hikvision/ds-pwa64-l-we.jpg"],
  ["riel-panel2", "https://riel.hu/images/products/hikvision/DS-PWA64-L-WE.jpg"],
];

const outDir = "public/img/categories/securite/probe";
for (const [name, url] of urls) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) {
      console.log("FAIL", name, r.status);
      continue;
    }
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length < 5000) {
      console.log("SMALL", name, buf.length);
      continue;
    }
    await sharp(buf).jpeg({ quality: 92 }).toFile(`${outDir}/${name}.jpg`);
    console.log("OK", name, buf.length);
  } catch (e) {
    console.log("ERR", name, e.message);
  }
}
