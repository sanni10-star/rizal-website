const urls = [
  "https://megalife.ma/product/chauffe-eau-electrique-smart-square/",
  "https://megalife.ma/product/chauffe-eau-electrique-smart-square-80l/",
];
for (const url of urls) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const h = await r.text();
  const og = h.match(/property="og:image" content="([^"]+)"/);
  console.log(url, r.status, og?.[1]);
}
