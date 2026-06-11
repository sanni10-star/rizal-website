import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dst = path.join(__dirname, "../public/img/piscine/traitement/products/chlore-choc.jpg");

const pages = [
  "https://www.ocedis.com/fr/chlore-rapide-v60/1400-chlore-rapide-v60.html",
  "https://www.drpiscines.com/item/chlore-rapide-v60-granule-5-kg/",
  "https://atout-piscine.fr/produit/chlore-rapide-v60-5kg/",
];

const direct = [
  "https://www.ocedis.com/1400-large_default/chlore-rapide-v60.jpg",
  "https://www.ocedis.com/1400-home_default/chlore-rapide-v60.jpg",
  "https://www.ocedis.com/img/p/1/4/0/1400-home_default.jpg",
];

function pick(html) {
  return [
    ...new Set(
      [...html.matchAll(/https?:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi)]
        .map((m) => m[0].split("?")[0])
        .filter(
          (u) =>
            !u.includes("logo") &&
            !u.includes("icon") &&
            !u.includes("banner") &&
            (u.includes("chlore") || u.includes("v60") || u.includes("1400") || u.includes("ocedis")),
        ),
    ),
  ];
}

const candidates = [...direct];
for (const page of pages) {
  const r = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
  console.log("page", page, r.status);
  if (!r.ok) continue;
  candidates.push(...pick(await r.text()));
}

const uniq = [...new Set(candidates)];
console.log("try", uniq.length, "urls");

for (const url of uniq) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) continue;
  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("image")) continue;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 12000) continue;
  const out = await sharp(buf)
    .flatten({ background: "#ffffff" })
    .resize(900, 675, { fit: "contain", background: "#ffffff" })
    .jpeg({ quality: 93 })
    .toBuffer();
  fs.writeFileSync(dst, out);
  console.log("saved", url, out.length);
  process.exit(0);
}

console.log("FAILED");
