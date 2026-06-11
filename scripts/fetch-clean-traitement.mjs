import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/piscine/traitement/products");

const targets = [
  {
    key: "anti-algue",
    urls: [
      "https://www.quimipool.com/fr/8744-algicide-et-anticalcaire-astralpool-special-pour-electrolyse-saline-en-5-lts.html",
      "https://www.paratureforma.com/fr/entretien-et-traitement-de-la-piscine/anti-algues-astralpool",
      "https://www.outlet-piscines.fr/astralpool-antialgas",
    ],
    direct: [
      "https://www.paratureforma.com/28024-home_default/anti-algues-astralpool.jpg",
      "https://www.paratureforma.com/28024-large_default/anti-algues-astralpool.jpg",
    ],
  },
  {
    key: "chlore-pastille",
    urls: [
      "https://www.quimipool.com/fr/11359-trichlor-en-comprimes-de-250-grammes-astralpool-en-5-kg-paquet-de-4-paquets.html",
      "https://www.quimipool.com/fr/10370-trichlor-en-poudre-astralpool-en-5-kg.html",
      "https://www.chausson.fr/quincaillerie/traitement-desinfectant-chlore-lent-galet-types-piscines-astralpool-galets-250g-seau-kg-p-202885-1",
    ],
    direct: [],
  },
];

function extractImages(html, base) {
  const found = new Set();
  const patterns = [
    /https?:\/\/[^"'\s>]+\/(?:home_default|large_default|thickbox_default)\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi,
    /https?:\/\/[^"'\s>]+\/media\/catalog\/product\/[^"'\s>]+\.(?:jpg|jpeg|png)/gi,
    /data-src="([^"]+\.(?:jpg|jpeg|png)[^"]*)"/gi,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      const raw = (m[1] || m[0]).split("?")[0];
      if (raw.includes("logo") || raw.includes("banner") || raw.includes("placeholder")) continue;
      found.add(raw.startsWith("http") ? raw : new URL(raw, base).href);
    }
  }
  return [...found];
}

async function download(url, referer) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Referer: referer } });
  if (!r.ok) return null;
  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("image")) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 12000) return null;
  return buf;
}

async function saveJpeg(key, buf) {
  const out = await sharp(buf)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize(900, 675, { fit: "contain", background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 93 })
    .toBuffer();
  const dst = path.join(outDir, `${key}.jpg`);
  fs.writeFileSync(dst, out);
  const meta = await sharp(out).metadata();
  console.log("saved", key, `${meta.width}x${meta.height}`, out.length);
}

for (const t of targets) {
  const candidates = [...t.direct];
  for (const page of t.urls) {
    try {
      const r = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) continue;
      const html = await r.text();
      candidates.push(...extractImages(html, page));
    } catch {
      /* skip */
    }
  }

  const uniq = [...new Set(candidates)];
  console.log(t.key, "candidates:", uniq.slice(0, 6).join(" | "));

  for (const img of uniq) {
    const buf = await download(img, t.urls[0]);
    if (!buf) continue;
    await saveJpeg(t.key, buf);
    break;
  }
}
