import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "@napi-rs/canvas";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

const standardFontDataUrl = path
  .join(root, "node_modules/pdfjs-dist/standard_fonts/")
  .replace(/\\/g, "/");
const cMapUrl = path.join(root, "node_modules/pdfjs-dist/cmaps/").replace(/\\/g, "/");

async function renderPdf(pdfPath, outDir, scale = 2.5) {
  fs.mkdirSync(outDir, { recursive: true });
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await getDocument({
    data,
    standardFontDataUrl,
    cMapUrl,
    cMapPacked: true,
    verbosity: 0,
  }).promise;

  const slug = path.basename(pdfPath, ".pdf");
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const out = path.join(outDir, `${slug}-page-${String(p).padStart(2, "0")}.png`);
    fs.writeFileSync(out, canvas.toBuffer("image/png"));
    console.log("Wrote", out);
  }
}

const pdf = process.argv[2];
const out = process.argv[3];
if (!pdf || !out) {
  console.error("Usage: node render-pdf-pages.mjs <pdf> <outDir>");
  process.exit(1);
}
await renderPdf(path.resolve(pdf), path.resolve(out));
