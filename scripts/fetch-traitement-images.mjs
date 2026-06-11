import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public/img/piscine/traitement/products");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { key: "chlore-poudre-astral", url: "https://bricoland.ma/chlore-en-poudre-5kg.html" },
  { key: "chlore-pastille", url: "https://bricoland.ma/chlore-en-galets-astralpool.html" },
  { key: "chlore-choc", url: "https://bricoland.ma/chlore-choc-20g-pastilles-5kg-ocedis.html" },
  { key: "anti-algue", url: "https://bricoland.ma/anti-algues-5l-astralpool.html" },
  { key: "floculant", url: "https://bricoland.ma/floculant-liquide-5l-ocedis.html" },
  { key: "ph-moins", url: "https://bricoland.ma/ph-minus-poudre-5kg-ocedis.html" },
  { key: "anti-calcaire", url: "https://bricoland.ma/detartrant-extra-5l-astralpool.html" },
  { key: "chlore-poudre-rizal", url: "https://www.quimipool.com/fr/10370-trichlor-en-poudre-astralpool-en-5-kg.html" },
];

function findImages(html, baseUrl) {
  const found = new Set();
  const patterns = [
    /\/media\/catalog\/product\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi,
    /https?:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi,
    /data-zoom-image="([^"]+)"/gi,
    /data-src="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/gi,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      const raw = m[1] || m[0];
      if (!raw || raw.includes("logo") || raw.includes("banner") || raw.includes("placeholder")) continue;
      const abs = raw.startsWith("http") ? raw : new URL(raw, baseUrl).href;
      if (abs.includes("/media/catalog/product/") || abs.includes("quimipool") || abs.includes("astralpool")) {
        found.add(abs.split("?")[0]);
      }
    }
  }
  return [...found];
}

async function download(key, imgUrl, referer) {
  const ir = await fetch(imgUrl, { headers: { "User-Agent": "Mozilla/5.0", Referer: referer } });
  if (!ir.ok) return false;
  const ct = ir.headers.get("content-type") || "";
  if (!ct.includes("image")) return false;
  const buf = Buffer.from(await ir.arrayBuffer());
  if (buf.length < 15000) return false;
  const ext = imgUrl.includes(".png") ? "png" : "jpg";
  const dst = path.join(outDir, `${key}.${ext}`);
  fs.writeFileSync(dst, buf);
  console.log("saved", key, dst, buf.length);
  return true;
}

for (const p of pages) {
  try {
    const r = await fetch(p.url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await r.text();
    const imgs = findImages(html, p.url);
    console.log(p.key, "candidates:", imgs.slice(0, 5).join(" | ") || "none");
    let ok = false;
    for (const img of imgs) {
      if (await download(p.key, img, p.url)) { ok = true; break; }
    }
    if (!ok) console.log("FAILED", p.key);
  } catch (e) {
    console.log("fail", p.key, e.message);
  }
}
