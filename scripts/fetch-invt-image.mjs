import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/img/solaire/variateurs/products/invt-variateur-product-source.jpg");

const pages = [
  "https://magitec.ma/fr/kit-pompe-solaire-maroc/165-variateur-de-pompe-a-eau-solaire-invt.html",
  "https://panneauxsolaire.ma/product/variateur-solaire-invt-220v-380v-2-2kw-4kw-7-5kw-11kw-15kw-185kw-22kw-30kw-37kw-45kw-55kw-75kw/",
];

for (const page of pages) {
  const res = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  const urls = [
    ...html.matchAll(/(?:src|data-src|content)=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/gi),
  ].map((m) => m[1].replace(/&amp;/g, "&"));

  const candidates = urls.filter(
    (u) =>
      /invt|gd100|variateur|pump|pompe/i.test(u) ||
      (/product|upload|wp-content/i.test(u) && !/logo|icon|banner|flag/i.test(u)),
  );

  for (const raw of [...new Set(candidates)].slice(0, 8)) {
    const url = raw.startsWith("http") ? raw : new URL(raw, page).href;
    try {
      const imgRes = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!imgRes.ok) continue;
      const buf = Buffer.from(await imgRes.arrayBuffer());
      if (buf.length < 8000) continue;
      fs.writeFileSync(out, buf);
      console.log("saved", url, buf.length);
      process.exit(0);
    } catch {
      /* try next */
    }
  }
}

console.error("No INVT image found");
process.exit(1);
