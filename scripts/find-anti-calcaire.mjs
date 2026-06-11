const urls = [
  "https://bricoland.ma/detartrant-extra-5l-astral-pool.html",
  "https://bricoland.ma/detartrant-filtre-5l.html",
  "https://bricoland.ma/sequestrant-calcaire-5l-astralpool.html",
];
for (const url of urls) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  console.log(url, r.status);
  if (!r.ok) continue;
  const html = await r.text();
  const imgs = [...html.matchAll(/https:\/\/bricoland\.ma\/media\/catalog\/product\/[^"'\s>]+\.(?:jpg|jpeg|png)/gi)]
    .map((m) => m[0])
    .filter((u) => u.includes("/image/9df78eab") || u.includes("/image/720x799"));
  console.log(imgs.slice(0, 2).join("\n") || "none");
}
