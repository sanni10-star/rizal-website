import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/piscine/traitement/products");

const fixes = [
  { key: "chlore-choc", url: "https://bricoland.ma/chlore-choc-v60-5kg-granule.html", mustInclude: "chlore" },
  { key: "ph-moins", url: "https://bricoland.ma/ph-poudre-5kg-ocedis.html", mustInclude: "ph" },
  { key: "anti-calcaire", url: "https://bricoland.ma/detartrant-filtre-5l-astralpool.html", mustInclude: "detar" },
];

async function main() {
  for (const f of fixes) {
    const r = await fetch(f.url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await r.text();
    const imgs = [...html.matchAll(/https:\/\/bricoland\.ma\/media\/catalog\/product\/[^"'\s>]+\.(?:jpg|jpeg|png)/gi)]
      .map((m) => m[0].split("?")[0])
      .filter((u) => u.includes("/image/9df78eab") || u.includes("/image/720x799"))
      .filter((u) => !f.mustInclude || u.toLowerCase().includes(f.mustInclude));
    console.log(f.key, imgs[0] || "NONE");
    if (!imgs[0]) continue;
    const ir = await fetch(imgs[0], { headers: { "User-Agent": "Mozilla/5.0", Referer: f.url } });
    const buf = Buffer.from(await ir.arrayBuffer());
    const ext = imgs[0].includes(".png") ? "png" : "jpg";
    fs.writeFileSync(path.join(outDir, `${f.key}.${ext}`), buf);
    console.log("saved", f.key, buf.length);
  }
}

main();
