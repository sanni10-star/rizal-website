import fs from "fs";
import sharp from "sharp";

const urls = [
  ["imou-ubitech", "https://www.ubitech.fr/5119-thickbox_default/camera-wifi-imou-cruiser-dual-2-10mp.jpg"],
  ["cam-white", "https://www.ubitech.fr/4561-thickbox_default/hikvision-ds-2cd2047g2-lu-2mp-colorvu-microphone-lumiere-blanche.jpg"],
  ["cam-black", "https://neotechsecurity.com/7336-large_default_2x/hikvision-4mp-colorvu-acusense-ip-bullet-camera-ds-2cd2047g2h-liu-sl28-ef-black.jpg"],
  ["ax-panel", "https://neotechsecurity.com/1867-superlarge_default_2x/ds-pwa64-l-we-6941264061366.jpg"],
  ["fumee", "https://www.securimport.com/web/image/product.template/23126/image_1920?unique=4124252"],
];

const out = "public/img/categories/securite/verify";
fs.mkdirSync(out, { recursive: true });
for (const [n, u] of urls) {
  const r = await fetch(u, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.ubitech.fr/" },
  });
  const b = Buffer.from(await r.arrayBuffer());
  await sharp(b).jpeg().toFile(`${out}/${n}.jpg`);
  const m = await sharp(b).metadata();
  console.log(n, m.width, m.height, b.length);
}
