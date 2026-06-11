const url = "https://megalife.ma/product/chauffe-eau-electrique-slim-silver-50l/";
const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const h = await r.text();
console.log("status", r.status, "len", h.length);
const og = h.match(/property="og:image" content="([^"]+)"/);
console.log("og:image", og?.[1]);
const uploads = [
  ...new Set([...h.matchAll(/wp-content\/uploads\/[^"'\s<>]+/g)].map((m) => m[0])),
].slice(0, 20);
console.log("uploads", uploads);
const jsonLd = h.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
if (jsonLd) console.log("jsonld", jsonLd[1].slice(0, 500));
