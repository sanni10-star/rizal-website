import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import canvas from "canvas";

const { createCanvas, Image } = canvas;
globalThis.Image = Image;
globalThis.HTMLCanvasElement = canvas.Canvas;
globalThis.HTMLImageElement = Image;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");

function assetUrl(rel) {
  return path.join(root, rel).replace(/\\/g, "/");
}

class NodeCanvasFactory {
  create(w, h) {
    const c = createCanvas(w, h);
    return { canvas: c, context: c.getContext("2d") };
  }
  reset({ canvas }, w, h) {
    canvas.width = w;
    canvas.height = h;
  }
  destroy({ canvas }) {
    canvas.width = 0;
    canvas.height = 0;
  }
}

async function renderPdf(pdfRel, outRel, scale = 2.5) {
  const pdfPath = path.join(root, pdfRel);
  const outDir = path.join(root, outRel);
  fs.mkdirSync(outDir, { recursive: true });
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const slug = path.basename(pdfPath, ".pdf");
  const factory = new NodeCanvasFactory();

  const doc = await getDocument({
    data,
    cMapUrl: assetUrl("node_modules/pdfjs-dist/cmaps/"),
    standardFontDataUrl: assetUrl("node_modules/pdfjs-dist/standard_fonts/"),
    cMapPacked: true,
    verbosity: 0,
  }).promise;

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale });
    const { canvas: cnv, context } = factory.create(
      Math.ceil(viewport.width),
      Math.ceil(viewport.height),
    );
    await page.render({
      canvasContext: context,
      viewport,
      canvasFactory: factory,
    }).promise;
    const out = path.join(outDir, `${slug}-page-${String(p).padStart(2, "0")}.png`);
    fs.writeFileSync(out, cnv.toBuffer("image/png"));
    console.log("OK", path.relative(root, out));
  }
  await doc.destroy();
}

const jobs = [
  ["public/docs/solaire-thermique/chauffe-eau-solaire-emaille.pdf", "public/img/solaire/thermique/from-pdf/chauffe-eau-solaire-emaille/pages-png"],
  ["public/docs/solaire-thermique/lato-teliko-a4-en.pdf", "public/img/solaire/thermique/from-pdf/lato-teliko-a4-en/pages-png"],
  ["public/docs/solaire-thermique/certificat-sonne-aktion-keymark.pdf", "public/img/solaire/thermique/from-pdf/certificat-sonne-aktion-keymark/pages-png"],
];

for (const [pdf, out] of jobs) {
  try {
    await renderPdf(pdf, out);
  } catch (e) {
    console.error("FAIL", pdf, e.message);
  }
}
