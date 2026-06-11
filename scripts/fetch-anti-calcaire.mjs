import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/piscine/traitement/products");

const pages = [
  "https://bricoland.ma/anticalcaire-liquide-5l-ocedis-ocedis.html",
  "https://bricoland.ma/detartrant-extra-5l-astralpool.html",
  "https://bricoland.ma/sequestrant-calcaire-5l-ocedis.html",
];

async function main() {
  for (const url of pages) {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    console.log(url, r.status);
    if (!r.ok) continue;
    const html = await r.text();
    const imgs = [...html.matchAll(/https:\/\/bricoland\.ma\/media\/catalog\/product\/[^"'\s>]+\.(?:jpg|jpeg|png)/gi)]
      .map((m) => m[0].split("?")[0])
      .filter((u) => u.includes("/image/9df78eab") || u.includes("/image/720x799"));
    console.log(imgs[0] || "none");
    if (!imgs[0]) continue;
    const ir = await fetch(imgs[0], { headers: { "User-Agent": "Mozilla/5.0", Referer: url } });
    const buf = Buffer.from(await ir.arrayBuffer());
    const ext = imgs[0].includes(".png") ? "png" : "jpg";
    const dst = path.join(outDir, `anti-calcaire.${ext}`);
    fs.writeFileSync(dst, buf);
    console.log("saved", dst, buf.length);
    return;
  }
}

main();
