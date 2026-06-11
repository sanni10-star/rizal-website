import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/categories/automatisation");
fs.mkdirSync(outDir, { recursive: true });

const products = [
  {
    key: "euromatic-techno",
    urls: [
      "https://euromaticgate.net/wp-content/uploads/2023/06/Techno-1.png",
      "https://euromaticgate.net/wp-content/uploads/2021/03/techno.png",
    ],
    pages: ["https://euromaticgate.net/fr/prodotto/techno/"],
    referer: "https://euromaticgate.net/",
  },
  {
    key: "key-coulissant",
    urls: [
      "https://www.key-automation.com/4116-home_default/999cast004a00.jpg",
      "https://www.key-automation.com/4116-large_default/999cast004a00.jpg",
    ],
    pages: ["https://www.key-automation.com/portails-coulissants/1777-999cast004a00.html"],
    referer: "https://www.key-automation.com/",
  },
];

function extractImages(html, base) {
  const found = new Set();
  for (const m of html.matchAll(/https?:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi)) {
    const raw = m[0].split("?")[0];
    if (raw.includes("logo") || raw.includes("banner") || raw.includes("slider")) continue;
    found.add(raw.startsWith("http") ? raw : new URL(raw, base).href);
  }
  return [...found];
}

async function download(url, referer) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: referer },
  });
  if (!r.ok) return null;
  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("image")) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 5000) return null;
  return buf;
}

const saved = {};

for (const p of products) {
  const candidates = [...p.urls];
  for (const page of p.pages || []) {
    try {
      const r = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) continue;
      candidates.push(...extractImages(await r.text(), page));
    } catch {
      /* ignore */
    }
  }
  for (const url of candidates) {
    const buf = await download(url, p.referer);
    if (!buf) continue;
    const out = await sharp(buf)
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .resize(700, 520, { fit: "contain", background: { r: 248, g: 246, b: 242 } })
      .png()
      .toBuffer();
    const dst = path.join(outDir, `${p.key}.png`);
    fs.writeFileSync(dst, out);
    saved[p.key] = out;
    console.log("saved", p.key, url, out.length);
    break;
  }
  if (!saved[p.key]) console.error("FAILED", p.key);
}

if (saved["euromatic-techno"] && saved["key-coulissant"]) {
  const card = await sharp({
    create: {
      width: 1200,
      height: 1600,
      channels: 3,
      background: { r: 14, g: 22, b: 42 },
    },
  })
    .composite([
      {
        input: await sharp(saved["euromatic-techno"]).resize(520, 380, { fit: "contain" }).png().toBuffer(),
        left: 80,
        top: 420,
      },
      {
        input: await sharp(saved["key-coulissant"]).resize(520, 380, { fit: "contain" }).png().toBuffer(),
        left: 600,
        top: 420,
      },
    ])
    .jpeg({ quality: 92 })
    .toBuffer();
  const cardPath = path.join(__dirname, "../public/img/categories/automatisation-eau-portail.jpg");
  fs.writeFileSync(cardPath, card);
  console.log("card", cardPath, card.length);
}
