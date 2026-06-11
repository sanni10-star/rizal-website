import sharp from "sharp";

const urls = [
  ["ub-pir", "https://www.ubitech.fr/2890-large_default/hikvision-ds-pdp15p-eg2-we-detecteur-de-mouvement-sans-fil-pour-alarme-hikvision-ax-pro.jpg"],
  ["ub-contact", "https://www.ubitech.fr/2891-large_default/hikvision-ds-pdmc-eg2-we-contact-magnetique-sans-fil-pour-alarme-hikvision-ax-pro.jpg"],
  ["ub-key", "https://www.ubitech.fr/2892-large_default/hikvision-ds-pkf1-we-telecommande-sans-fil-pour-alarme-hikvision-ax-pro.jpg"],
  ["ub-panel", "https://www.ubitech.fr/2800-large_default/hikvision-ds-pwa64-l-we-centrale-alarme-sans-fil-ax-pro.jpg"],
  ["ub-fumee", "https://www.ubitech.fr/2889-large_default/hikvision-ds-pdsmk-e-we-detecteur-de-fumee-sans-fil-technologie-photoelectrique-pour-alarme-hikvision-ax-pro-6931847172091.jpg"],
];

const out = "public/img/categories/securite/probe";
for (const [n, u] of urls) {
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.ubitech.fr/" } });
    const b = Buffer.from(await r.arrayBuffer());
    if (b.length > 5000) {
      await sharp(b).jpeg().toFile(`${out}/u3-${n}.jpg`);
      console.log("OK", n, b.length);
    } else console.log("skip", n, r.status, b.length);
  } catch (e) {
    console.log("ERR", n);
  }
}
