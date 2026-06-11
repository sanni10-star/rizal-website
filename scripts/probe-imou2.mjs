import fs from "fs";
import sharp from "sharp";

const page = await fetch("https://www.imou.com/en/product/detail/cruiser-dual2", {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await page.text();
const imgs = [
  ...new Set(
    [...html.matchAll(/https:\/\/static-website\.imou\.com\/[a-f0-9]+\.png/gi)].map((m) => m[0]),
  ),
];

fs.mkdirSync("public/img/categories/securite/probe/imou", { recursive: true });
for (const [i, url] of imgs.slice(0, 15).entries()) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!r.ok) continue;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 8000) continue;
  const m = await sharp(buf).metadata();
  await sharp(buf).jpeg({ quality: 90 }).toFile(`public/img/categories/securite/probe/imou/${i}-${m.width}x${m.height}.jpg`);
  console.log(i, m.width, m.height, buf.length, url);
}
