const page =
  "https://www.ecwat.com/product/pompes-horizontales/pompe-centrifuge-multicellulaire-horizontale-mh-145-lmin";
const r = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
const h = await r.text();
const imgs = [
  ...new Set(
    [...h.matchAll(/https:\/\/www\.ecwat\.com\/uploads\/[^"'\s]+\.(?:webp|jpg|png)/gi)].map(
      (m) => m[0],
    ),
  ),
];
console.log("imgs", imgs);
