const urls = [
  "https://store.imou.com/products/cruiser-dual-3mp-3mp-5mp",
  "https://www.imou.com/en/product/detail/cruiser-dual2",
];

for (const u of urls) {
  const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
  const h = await r.text();
  const og = [...h.matchAll(/property="og:image" content="([^"]+)"/g)].map((m) => m[1]);
  const cdn = [
    ...new Set(
      [...h.matchAll(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0]),
    ),
  ].filter((x) => x.includes("imou") || x.includes("cdn"));
  console.log("===", u);
  console.log("og:", og);
  console.log("cdn:", cdn.slice(0, 12));
}
