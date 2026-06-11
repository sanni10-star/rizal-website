import fs from "fs";
import sharp from "sharp";

const pages = [
  "https://stemarshop.co.za/product/imou-cruiser-dual-2-10mp/",
  "https://store.imou.com/en-uk/products/cruiser-dual-5mp-3mp-3mp-copy",
  "https://store.imou.com/products/cruiser-dual-3mp-3mp-5mp",
  "https://www.imou.com/en/product/detail/cruiser-dual2",
  "https://www.imou.com.pk/products/cruiser-dual-10mp-wifi-smart-security-camera",
];

fs.mkdirSync("public/img/categories/securite/probe/imou3", { recursive: true });

for (const url of pages) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const h = await r.text();
  const og = [...h.matchAll(/property="og:image" content="([^"]+)"/g)].map((m) => m[1]);
  const imgs = [
    ...new Set([
      ...og,
      ...[...h.matchAll(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\s]*)?/gi)].map((m) => m[0]),
    ]),
  ].filter((u) => !u.includes("flag") && !u.includes("icon") && !u.includes("logo"));

  console.log("\n===", url);
  for (const img of imgs.slice(0, 8)) console.log(img);
}

const direct = [
  "https://cdn.shopify.com/s/files/1/0727/5711/7240/files/2-pieces-cruiser-dual-kit-5mp3mp-3mp3mp-999953.jpg",
  "https://store.imou.com/cdn/shop/files/2-pieces-cruiser-dual-kit-5mp3mp-3mp3mp-999953.jpg?v=1763021511&width=2048",
];

for (const [i, url] of direct.entries()) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Referer: "https://store.imou.com/" } });
  if (!r.ok) {
    console.log("fail", url, r.status);
    continue;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  await sharp(buf).jpeg({ quality: 92 }).toFile(`public/img/categories/securite/probe/imou3/direct-${i}.jpg`);
  console.log("saved direct", i, buf.length);
}
