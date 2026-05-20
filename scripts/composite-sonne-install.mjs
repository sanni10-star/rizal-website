/**
 * Vues « En situation » Sonne Aktion : pack + régulation (double capteur)
 * sont recomposées ici à partir du main catalogue.
 *
 * Le 1 capteur (sonne-collector-install.png) est géré comme asset HD séparé
 * pour éviter d’écraser une vue villa lors du script assign.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRAME_W = 960;
const FRAME_H = 720;

/** Fond ciel / terrasse discret (tons site). */
function installBackgroundSvg() {
  return Buffer.from(
    `<svg width="${FRAME_W}" height="${FRAME_H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b9daf2"/>
          <stop offset="45%" stop-color="#e6e2da"/>
          <stop offset="100%" stop-color="#c5beb2"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#sky)"/>
      <path d="M0 ${FRAME_H * 0.58} L${FRAME_W} ${FRAME_H * 0.52} L${FRAME_W} ${FRAME_H} L0 ${FRAME_H} Z" fill="#a0988c" opacity="0.28"/>
    </svg>`,
  );
}

/**
 * @typedef {{ main: string; install: string; overlayPdfLogo?: boolean; tankY?: number; tankX?: number; logoMaxW?: number }} SonneSku
 */
const SONNE_SKUS = /** @type {SonneSku[]} */ ([
  {
    main: "sonne-pack-main.png",
    install: "sonne-pack-install.png",
    overlayPdfLogo: false,
  },
  {
    main: "sonne-regulation-main.png",
    install: "sonne-regulation-install.png",
    overlayPdfLogo: false,
  },
]);

export async function buildSonneInstallShots(projectRoot = path.join(__dirname, "..")) {
  const therm = path.join(projectRoot, "public/img/solaire/thermique");
  const logoPath = path.join(projectRoot, "public/img/brands/solaire/logo-sonne-aktion.png");

  const logoExists = fs.existsSync(logoPath);

  const bgBase = await sharp(installBackgroundSvg()).ensureAlpha().png().toBuffer();

  for (const sku of SONNE_SKUS) {
    const mainPath = path.join(therm, sku.main);
    const outPath = path.join(therm, sku.install);

    if (!fs.existsSync(mainPath)) {
      console.warn("composite-sonne-install: fichier produit absent, skip.", mainPath);
      continue;
    }

    let trimmedBuf;
    try {
      trimmedBuf = await sharp(mainPath)
        .flatten({ background: "#ffffff" })
        .trim({ threshold: 22, background: "#ffffff" })
        .png()
        .toBuffer();
    } catch {
      trimmedBuf = await sharp(mainPath).flatten({ background: "#ffffff" }).png().toBuffer();
    }

    const maxW = Math.round(FRAME_W * 0.88);
    const maxH = Math.round(FRAME_H * 0.7);
    const productBuf = await sharp(trimmedBuf)
      .resize(maxW, maxH, {
        fit: "inside",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer();

    const pm = await sharp(productBuf).metadata();
    const prodW = pm.width ?? maxW;
    const prodH = pm.height ?? maxH;
    const left = Math.round((FRAME_W - prodW) / 2);
    const top = Math.round(FRAME_H - prodH - 32);

    const layers = [{ input: productBuf, left, top, blend: "over" }];

    if (sku.overlayPdfLogo && sku.tankY != null && sku.tankX != null && sku.logoMaxW != null && logoExists) {
      const logoBuf = await sharp(logoPath)
        .resize(sku.logoMaxW, undefined, { fit: "inside" })
        .png()
        .toBuffer();

      const cx = left + prodW * sku.tankX;
      const cy = top + prodH * sku.tankY;

      const logoPlate = await sharp(logoBuf)
        .extend({
          top: 10,
          bottom: 10,
          left: 14,
          right: 14,
          background: "#ffffff",
        })
        .png()
        .toBuffer();

      const plateMeta = await sharp(logoPlate).metadata();
      const plateW = plateMeta.width ?? sku.logoMaxW;
      const plateH = plateMeta.height ?? 48;
      const pad = 10;
      let logoLeft = Math.round(cx - plateW / 2);
      let logoTop = Math.round(cy - plateH / 2);
      logoLeft = Math.min(Math.max(pad, logoLeft), FRAME_W - plateW - pad);
      logoTop = Math.min(Math.max(pad, logoTop), FRAME_H - plateH - pad);

      layers.push({ input: logoPlate, left: logoLeft, top: logoTop, blend: "over" });
    }

    await sharp(bgBase).composite(layers).png({ compressionLevel: 9 }).toFile(outPath);

    console.log("sonne install ->", path.relative(projectRoot, outPath));
  }
}
