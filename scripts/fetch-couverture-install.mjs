import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const installDir = path.join(__dirname, "../public/img/piscine/couverture/install");

fs.mkdirSync(installDir, { recursive: true });

/** Photos piscine plein cadre — style install filtres à sable */
const SLIDES = {
  "non-bordee": {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1920&q=85",
    tint: "#1B6CA8",
  },
  "bordee-2": {
    url: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1920&q=85",
    tint: "#0077B6",
  },
  "bordee-4": {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1920&q=85",
    tint: "#003DA5",
  },
  "geobubble-400": {
    url: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1920&q=85",
    tint: "#2D6A4F",
  },
  "geobubble-500": {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1920&q=85",
    tint: "#1D3557",
  },
};

async function download(url) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  return buf.length > 20000 ? buf : null;
}

for (const [key, { url, tint }] of Object.entries(SLIDES)) {
  const raw = await download(url);
  if (!raw) {
    console.error("FAILED", key, url);
    continue;
  }

  const out = await sharp(raw)
    .resize(1920, 820, { fit: "cover", position: "centre" })
    .composite([
      {
        input: Buffer.from(`
<svg width="1920" height="820" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${tint}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0b0f1c" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="820" fill="url(#g)"/>
</svg>`),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 92 })
    .toBuffer();

  fs.writeFileSync(path.join(installDir, `${key}-install.jpg`), out);
  console.log("saved", key, out.length);
}

console.log("done");
