import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/categories/chauffe-eau");

const PRODUCTS = [
  ["slim-silver", "https://megalife.ma/product/chauffe-eau-electrique-slim-silver-50l/"],
  ["smart-square", "https://megalife.ma/product/chauffe-eau-electrique-smart-square-50l/"],
  ["blanc-elcb", "https://megalife.ma/product/chauffe-eau-electrique-blanc-protection-elcb-100l/"],
  ["mini-eco", "https://megalife.ma/product/chauffe-eau-electrique-mini-eco-protection-elcb-30l/"],
  ["horizontal", "https://megalife.ma/product/chauffe-eau-electrique-horizontal-deco-slim-silver-60l/"],
  ["deco-elcb", "https://megalife.ma/product/chauffe-eau-electrique-deco-silver-protection-elcb-30l/"],
  ["flashheat", "https://megalife.ma/product/chauffe-eau-electrique-instantane-ml-rc-flashheat-5-5kw/"],
];

fs.mkdirSync(outDir, { recursive: true });

function pickImage(html) {
  const og = html.match(/property="og:image" content="([^"]+)"/);
  if (og?.[1]) return og[1];

  const media = [
    ...new Set(
      [...html.matchAll(/https:\/\/media\.megalife\.ma\/media\/megalife\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi)].map(
        (m) => m[0],
      ),
    ),
  ].filter((u) => !u.includes("logo") && !/-\d{2,3}x\d{2,3}\./.test(u));

  return media[0];
}

for (const [name, url] of PRODUCTS) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await r.text();
    const imgUrl = pickImage(html);
    if (!imgUrl) {
      console.log("NO IMG", name, r.status);
      continue;
    }
    const ir = await fetch(imgUrl, { headers: { "User-Agent": "Mozilla/5.0", Referer: url } });
    if (!ir.ok) {
      console.log("DL FAIL", name, ir.status, imgUrl);
      continue;
    }
    const buf = Buffer.from(await ir.arrayBuffer());
    const ext = imgUrl.match(/\.(jpe?g|png|webp)/i)?.[1]?.toLowerCase() || "jpg";
    const out = path.join(outDir, `${name}-source.${ext === "jpeg" ? "jpg" : ext}`);
    fs.writeFileSync(out, buf);
    console.log("OK", name, out, buf.length, imgUrl);
  } catch (e) {
    console.log("ERR", name, e.message);
  }
}
