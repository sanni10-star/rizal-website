const categories = [
  ["slim-silver", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique-slim-silver/"],
  ["smart-square", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique/chauffe-eau-electrique-smart-square/"],
  ["blanc-elcb", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique-blanc-protection-elcb/"],
  ["mini-eco", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique-mini-eco-protection-elcb/"],
  ["horizontal", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique-horizontal-slim-silver/"],
  ["deco-elcb", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique-deco-silver-protection-elcb/"],
  ["instantane", "https://megalife.ma/product-category/chauffage-et-ecs/chauffe-eau-electrique-instantane/"],
];

for (const [name, url] of categories) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const h = await r.text();
    const products = [
      ...new Set([...h.matchAll(/https:\/\/megalife\.ma\/product\/chauffe-eau[^"']+/gi)].map((m) => m[0])),
    ].slice(0, 3);
    const imgs = [
      ...new Set([
        ...[...h.matchAll(/https:\/\/megalife\.ma\/wp-content\/uploads\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi)].map(
          (m) => m[0],
        ),
        ...[...h.matchAll(/data-src="(https:\/\/megalife\.ma\/wp-content\/uploads\/[^"]+)"/gi)].map((m) => m[1]),
      ]),
    ].filter((u) => !u.includes("logo") && !u.includes("banner") && !u.includes("-150x"));
    console.log("\n===", name, r.status);
    console.log("products:", products.slice(0, 2));
    console.log("imgs:", imgs.slice(0, 4));
  } catch (e) {
    console.log("FAIL", name, e.message);
  }
}
