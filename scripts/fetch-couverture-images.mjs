import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/img/piscine/couverture/products");

const targets = [
  {
    key: "non-bordee",
    direct: [
      "https://www.piscine-center.net/uppict/large/bache-a-bulles-bleu-bleu-400-microns-non-bordee-70677.jpg",
    ],
    referer: "https://www.piscine-center.net/",
  },
  {
    key: "bordee-2",
    direct: [
      "https://www.piscine-center.net/uppict/large/bache-a-bulles-bleu-bleu-400-microns-bordee-2-cotes-70673.jpg",
    ],
    referer: "https://www.piscine-center.net/",
  },
  {
    key: "bordee-4",
    direct: [
      "https://www.piscine-center.net/uppict/large/bache-a-bulles-bleu-bleu-400-microns-bordee-4-cotes-70685.jpg",
    ],
    referer: "https://www.piscine-center.net/",
  },
  {
    key: "geobubble-400",
    direct: [
      "https://www.allswimltd.com/images/thumbs/0010345_geobubble-400-micron-light-blue-solar-covers.jpeg",
    ],
    referer: "https://www.allswimltd.com/",
    sliderCrop: true,
  },
  {
    key: "geobubble-500",
    direct: [
      "https://www.allswimltd.com/images/thumbs/0010347_geobubble-500-micron-dark-blue-solar-covers.jpeg",
      "https://www.allswimltd.com/images/thumbs/0010345_geobubble-400-micron-light-blue-solar-covers.jpeg",
    ],
    referer: "https://www.allswimltd.com/",
    sliderCrop: true,
  },
];

function extractImages(html, base) {
  const found = new Set();
  const patterns = [
    /https?:\/\/[^"'\s>]+\.(?:jpg|jpeg|png|webp)/gi,
    /data-src="([^"]+\.(?:jpg|jpeg|png)[^"]*)"/gi,
  ];
  for (const re of patterns) {
    for (const m of html.matchAll(re)) {
      const raw = (m[1] || m[0]).split("?")[0];
      if (
        raw.includes("logo") ||
        raw.includes("banner") ||
        raw.includes("placeholder") ||
        raw.includes("icon")
      )
        continue;
      if (!raw.match(/geobubble|bubble|cover|solar|bache|bulles/i)) continue;
      found.add(raw.startsWith("http") ? raw : new URL(raw, base).href);
    }
  }
  return [...found];
}

async function download(url, referer) {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0", Referer: referer },
  });
  if (!r.ok) return null;
  const ct = r.headers.get("content-type") || "";
  if (!ct.includes("image")) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  if (buf.length < 8000) return null;
  return buf;
}

async function saveJpeg(key, buf, sliderCrop = false) {
  let pipeline = sharp(buf);
  if (sliderCrop) {
    const { width, height } = await sharp(buf).metadata();
    pipeline = sharp(buf)
      .extract({
        left: 0,
        top: Math.round(height * 0.38),
        width: Math.round(width * 0.82),
        height: Math.round(height * 0.62),
      })
      .rotate(-8, { background: { r: 255, g: 255, b: 255 } })
      .resize(900, 675, { fit: "cover", position: "centre" });
  } else {
    pipeline = pipeline.resize(900, 675, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    });
  }
  const out = await pipeline
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 93 })
    .toBuffer();
  const dst = path.join(outDir, `${key}.jpg`);
  fs.writeFileSync(dst, out);
  const meta = await sharp(out).metadata();
  console.log("saved", key, `${meta.width}x${meta.height}`, out.length);
}

for (const t of targets) {
  const candidates = [...(t.direct || [])];
  for (const page of t.urls || []) {
    try {
      const r = await fetch(page, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!r.ok) continue;
      const html = await r.text();
      candidates.push(...extractImages(html, page));
    } catch (e) {
      console.warn("page fail", page, e.message);
    }
  }
  let saved = false;
  for (const url of candidates) {
    const buf = await download(url, t.referer || url);
    if (!buf) continue;
    await saveJpeg(t.key, buf, t.sliderCrop);
    saved = true;
    break;
  }
  if (!saved) console.error("FAILED", t.key, candidates.slice(0, 5));
}
