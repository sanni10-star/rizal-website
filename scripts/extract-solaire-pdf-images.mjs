/**
 * Extrait images embarquées + rendu page (PNG) depuis les PDF solaire thermique.
 * Usage: node scripts/extract-solaire-pdf-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const { getDocument, OPS } = await import("pdfjs-dist/legacy/build/pdf.mjs");

const PDF_DIR = path.join(root, "public/docs/solaire-thermique");
const OUT_DIR = path.join(root, "public/img/solaire/thermique/from-pdf");
const BRAND_DIR = path.join(root, "public/img/brands/solaire");

const PDFS = [
  "chauffe-eau-solaire-emaille.pdf",
  "chauffe-eau-solaire-emaille-2.pdf",
  "lato-teliko-a4-en.pdf",
  "certificat-sonne-aktion-keymark.pdf",
];

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function saveRawImage(img, outPath) {
  const { width, height, data, kind } = img;
  // RGBA or RGB from pdfjs
  if (!width || !height || !data) return false;

  // Use sharp if available for PNG; else write PPM as fallback
  try {
    const sharp = require("sharp");
    const channels = data.length / (width * height);
    if (channels === 4) {
      sharp(Buffer.from(data), { raw: { width, height, channels: 4 } })
        .png()
        .toFile(outPath);
      return true;
    }
    if (channels === 3) {
      sharp(Buffer.from(data), { raw: { width, height, channels: 3 } })
        .png()
        .toFile(outPath);
      return true;
    }
  } catch {
    // sharp not installed
  }

  // JPEG embedded may have .data as Uint8Array already compressed
  if (img.data instanceof Uint8Array && img.data[0] === 0xff && img.data[1] === 0xd8) {
    fs.writeFileSync(outPath.replace(/\.png$/, ".jpg"), Buffer.from(img.data));
    return true;
  }
  return false;
}

async function extractEmbedded(pdfPath, outSubDir) {
  ensureDir(outSubDir);
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({ data, useSystemFonts: true, verbosity: 0 }).promise;
  const slug = path.basename(pdfPath, ".pdf");
  const manifest = { pdf: slug, pages: doc.numPages, images: [] };
  let count = 0;

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      if (
        fn !== OPS.paintImageXObject &&
        fn !== OPS.paintJpegXObject &&
        fn !== OPS.paintInlineImageXObject
      ) {
        continue;
      }
      const imgName = ops.argsArray[i][0];
      try {
        const img = await page.objs.get(imgName);
        if (!img) continue;
        count++;
        const base = `${slug}-p${String(p).padStart(2, "0")}-img${String(count).padStart(3, "0")}`;
        const outPng = path.join(outSubDir, `${base}.png`);

        if (img.bitmap) {
          const ok = saveRawImage(img.bitmap, outPng);
          if (ok) manifest.images.push({ page: p, file: path.basename(outPng), w: img.bitmap.width, h: img.bitmap.height });
          continue;
        }

        if (img.data) {
          const ok = saveRawImage(img, outPng);
          if (ok) {
            manifest.images.push({ page: p, file: path.basename(outPng), w: img.width, h: img.height });
            continue;
          }
          const jpgPath = path.join(outSubDir, `${base}.jpg`);
          if (img.data instanceof Uint8Array) {
            fs.writeFileSync(jpgPath, Buffer.from(img.data));
            manifest.images.push({ page: p, file: path.basename(jpgPath), w: img.width, h: img.height });
          }
        }
      } catch (err) {
        // skip broken xobject
      }
    }
  }

  fs.writeFileSync(path.join(outSubDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`[${slug}] ${manifest.images.length} images from ${doc.numPages} pages`);
  return manifest;
}

async function renderPages(pdfPath, outSubDir) {
  // Optional: render full pages if @napi-rs/canvas is available
  try {
    const { createCanvas } = await import("@napi-rs/canvas");
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const doc = await getDocument({ data, useSystemFonts: true, verbosity: 0 }).promise;
    const slug = path.basename(pdfPath, ".pdf");
    const pagesDir = path.join(outSubDir, "pages");
    ensureDir(pagesDir);

    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = createCanvas(viewport.width, viewport.height);
      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;
      const buf = canvas.toBuffer("image/png");
      fs.writeFileSync(path.join(pagesDir, `${slug}-page-${String(p).padStart(2, "0")}.png`), buf);
    }
    console.log(`[${slug}] rendered ${doc.numPages} pages`);
    return true;
  } catch (e) {
    console.log(`Page render skipped for ${path.basename(pdfPath)}: ${e.message}`);
    return false;
  }
}

async function main() {
  ensureDir(OUT_DIR);
  ensureDir(BRAND_DIR);

  for (const name of PDFS) {
    const pdfPath = path.join(PDF_DIR, name);
    if (!fs.existsSync(pdfPath)) {
      console.warn("Missing:", pdfPath);
      continue;
    }
    const outSub = path.join(OUT_DIR, path.basename(name, ".pdf"));
    await extractEmbedded(pdfPath, outSub);
    await renderPages(pdfPath, outSub);
  }

  console.log("Done. Output:", OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
