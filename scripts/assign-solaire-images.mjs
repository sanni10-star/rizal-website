import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const FROM = path.join(root, "public/img/solaire/thermique/from-pdf");
const OUT = path.join(root, "public/img/solaire/thermique");
const BRANDS = path.join(root, "public/img/brands/solaire");

/** Cadre catalogue uniforme 4:3 */
const FRAME_W = 960;
const FRAME_H = 720;
const FRAME_BG = { r: 255, g: 255, b: 255, alpha: 1 };

const sources = {
  sonneLineup: path.join(FROM, "chauffe-eau-solaire-emaille/chauffe-eau-solaire-emaille-p01-img001.png"),
  /** Photo constructeur : préférer un PNG exporté depuis la fiche/PDF (pas une capture d’écran du navigateur). */
  sonneDualClean: path.join(FROM, "sonne-aktion-product-dual-clean.png"),
  /** Visuels HD 1 capteur (catalogue + villa) — remplacent le crop PDF si présents. */
  sonneCollectorProductHd: path.join(FROM, "sonne-collector-product-hd.png"),
  sonneCollectorInstallHd: path.join(FROM, "sonne-collector-install-hd.png"),
  /** Visuels HD 2 capteurs (catalogue studio + villa) — prioritaires sur sonneDualClean / PDF. */
  sonneDualProductHd: path.join(FROM, "sonne-dual-product-hd.png"),
  sonneDualInstallHd: path.join(FROM, "sonne-dual-install-hd.png"),
  latoPage1: path.join(FROM, "lato-teliko-a4-en/pages/lato-teliko-a4-en-page-01.png"),
  latoPage2: path.join(FROM, "lato-teliko-a4-en/pages/lato-teliko-a4-en-page-02.png"),
  latoClean: path.join(FROM, "lato-clean.png"),
  /** Vues « En situation » (toit / villa) — prioritaires sur le duplicate du cut-out produit. */
  latoInstall150Scene: path.join(FROM, "lato-150-install-scene.png"),
  latoInstall150House: path.join(FROM, "lato-150-install-house.png"),
  latoInstallDualScene: path.join(FROM, "lato-dual-install-scene.png"),
};

async function cropPct(src, { x, y, w, h }) {
  const meta = await sharp(src).metadata();
  const left = Math.max(0, Math.round(meta.width * x));
  const top = Math.max(0, Math.round(meta.height * y));
  const width = Math.min(meta.width - left, Math.round(meta.width * w));
  const height = Math.min(meta.height - top, Math.round(meta.height * h));
  return sharp(src).extract({ left, top, width, height });
}

/**
 * Rogne encore quelques % après extraction colonne (fins de graphisme PDF / flèches entre colonnes).
 * `left`/`top` évitent d’effacer le produit ; on privilégie bas-droite où ces artefacts apparaissent.
 */
async function shaveInteriorEdges(buffer, shave = {}) {
  const meta = await sharp(buffer).metadata();
  if (!meta.width || !meta.height) return buffer;

  const left = shave.left ? Math.round(meta.width * shave.left) : 0;
  const top = shave.top ? Math.round(meta.height * shave.top) : 0;
  const right = shave.right ? Math.round(meta.width * shave.right) : 0;
  const bottom = shave.bottom ? Math.round(meta.height * shave.bottom) : 0;
  const width = meta.width - left - right;
  const height = meta.height - top - bottom;

  if (width < 48 || height < 48) return buffer;

  return sharp(buffer).extract({ left, top, width, height }).png().toBuffer();
}

/** Supprime marges claires du PDF puis centre le produit dans un cadre 4:3. */
async function trimAndFrame(cropPipeline, outPath, frameOpts = {}) {
  let croppedBuf = await cropPipeline.png().toBuffer();

  if (frameOpts.shaveInner) {
    croppedBuf = await shaveInteriorEdges(croppedBuf, frameOpts.shaveInner);
  }

  let img = sharp(croppedBuf);
  const meta = await img.metadata();

  if (meta.width && meta.height && meta.width > 40 && meta.height > 40) {
    try {
      const trimmed = await img
        .trim({ threshold: 28, background: "#ffffff" })
        .toBuffer({ resolveWithObject: true });
      if (trimmed.info.width >= 24 && trimmed.info.height >= 24) {
        img = sharp(trimmed.data);
      }
    } catch {
      img = sharp(croppedBuf);
    }
  }

  let buf = await img.toBuffer();
  const pipe = sharp(buf);

  await pipe
    .resize(Math.round(FRAME_W * 0.9), Math.round(FRAME_H * 0.9), {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .extend({
      top: Math.round(FRAME_H * 0.05),
      bottom: Math.round(FRAME_H * 0.05),
      left: Math.round(FRAME_W * 0.05),
      right: Math.round(FRAME_W * 0.05),
      background: FRAME_BG,
    })
    .flatten({ background: FRAME_BG })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  console.log("->", path.relative(root, outPath));
}

async function productFromPct(src, outPath, crop, frameOpts = {}) {
  await trimAndFrame(await cropPct(src, crop), outPath, frameOpts);
}

async function logoFromPct(src, outPath, crop) {
  const cropped = await cropPct(src, crop);
  const buf = await cropped
    .trim({ threshold: 18, background: "#ffffff" })
    .png()
    .toBuffer();
  await sharp(buf)
    .resize(280, 80, { fit: "inside", background: { ...FRAME_BG, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log("logo ->", path.relative(root, outPath));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(BRANDS, { recursive: true });

  const lineup = sources.sonneLineup;

  // Logo LATO : inclure le « L » complet (éviter un crop trop à droite → « .ato »).
  await logoFromPct(sources.latoPage1, path.join(BRANDS, "logo-lato.png"), {
    x: 0.46,
    y: 0.025,
    w: 0.46,
    h: 0.125,
  });
  await logoFromPct(lineup, path.join(BRANDS, "logo-sonne-aktion.png"), {
    x: 0.02,
    y: 0.28,
    w: 0.14,
    h: 0.45,
  });

  /** Bandeau catalogue Sonne : sous le titre « PRODUIT », sans décor entre colonnes. */
  const SONNE_TOP = 0.17;
  const SONNE_H = 0.76;
  /** Marge horizontale accrue pour éviter pointes / flèches des séparateurs. */
  const SONNE_PAD_X = 0.034;
  /** Après extraction : enlève fins résidus bas-droite (artefacts vectoriels PDF). */
  const SONNE_SHAVE = { right: 0.045, bottom: 0.055 };

  const sonneColW = 0.25;

  // 1 capteur — visuels HD dédiés (évite le crop basse déf du PDF).
  if (
    fs.existsSync(sources.sonneCollectorProductHd) &&
    fs.existsSync(sources.sonneCollectorInstallHd)
  ) {
    await sharp(sources.sonneCollectorProductHd)
      .resize(FRAME_W, FRAME_H, {
        fit: "contain",
        background: FRAME_BG,
        kernel: sharp.kernel.lanczos3,
      })
      .flatten({ background: FRAME_BG })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, "sonne-collector-main.png"));
    console.log("->", path.relative(root, path.join(OUT, "sonne-collector-main.png")));

    await sharp(sources.sonneCollectorInstallHd)
      .resize(FRAME_W, FRAME_H, {
        fit: "cover",
        position: "centre",
        kernel: sharp.kernel.lanczos3,
      })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, "sonne-collector-install.png"));
    console.log("->", path.relative(root, path.join(OUT, "sonne-collector-install.png")));
  } else {
    console.warn(
      "Absents: sonne-collector-product-hd.png ou sonne-collector-install-hd.png — fallback PDF colonne 3.",
    );
    await productFromPct(
      lineup,
      path.join(OUT, "sonne-collector-main.png"),
      {
        x: 2 * sonneColW + SONNE_PAD_X,
        y: SONNE_TOP,
        w: sonneColW - SONNE_PAD_X * 2,
        h: SONNE_H,
      },
      { shaveInner: SONNE_SHAVE },
    );
  }

  // 2 capteurs — visuels HD dédiés (studio + villa) ou fallback photo PDF / brochure.
  if (
    fs.existsSync(sources.sonneDualProductHd) &&
    fs.existsSync(sources.sonneDualInstallHd)
  ) {
    const dualMainTargets = ["sonne-pack-main.png", "sonne-regulation-main.png"];
    const dualInstallTargets = ["sonne-pack-install.png", "sonne-regulation-install.png"];

    for (const name of dualMainTargets) {
      await sharp(sources.sonneDualProductHd)
        .resize(FRAME_W, FRAME_H, {
          fit: "contain",
          background: FRAME_BG,
          kernel: sharp.kernel.lanczos3,
        })
        .flatten({ background: FRAME_BG })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT, name));
      console.log("->", path.relative(root, path.join(OUT, name)));
    }
    for (const name of dualInstallTargets) {
      await sharp(sources.sonneDualInstallHd)
        .resize(FRAME_W, FRAME_H, {
          fit: "cover",
          position: "centre",
          kernel: sharp.kernel.lanczos3,
        })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT, name));
      console.log("->", path.relative(root, path.join(OUT, name)));
    }
  } else if (fs.existsSync(sources.sonneDualClean)) {
    await productFromPct(sources.sonneDualClean, path.join(OUT, "sonne-pack-main.png"), {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    });
    await productFromPct(sources.sonneDualClean, path.join(OUT, "sonne-regulation-main.png"), {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    });
  } else {
    console.warn("Absent:", sources.sonneDualClean, "— fallback PDF colonnes 0–1 pour pack / régulation.");
    for (const { out, col } of [
      { out: "sonne-regulation-main.png", col: 0 },
      { out: "sonne-pack-main.png", col: 1 },
    ]) {
      const x = col * sonneColW + SONNE_PAD_X;
      const w = sonneColW - SONNE_PAD_X * 2;
      await productFromPct(
        lineup,
        path.join(OUT, out),
        {
          x,
          y: SONNE_TOP,
          w,
          h: SONNE_H,
        },
        { shaveInner: SONNE_SHAVE },
      );
    }
  }

  const dualHdUsed =
    fs.existsSync(sources.sonneDualProductHd) && fs.existsSync(sources.sonneDualInstallHd);
  if (!dualHdUsed) {
    const { buildSonneInstallShots } = await import("./composite-sonne-install.mjs");
    await buildSonneInstallShots(root);
  }

  // LATO : vue PRODUIT — découpes depuis la vue catalogue nette (lato-clean.png).
  await productFromPct(sources.latoClean, path.join(OUT, "lato-150-main.png"), {
    x: 0.0,
    y: 0.0,
    w: 0.45,
    h: 1.0,
  });

  await productFromPct(sources.latoClean, path.join(OUT, "lato-200-main.png"), {
    x: 0.45,
    y: 0.0,
    w: 0.55,
    h: 1.0,
  });

  await productFromPct(sources.latoClean, path.join(OUT, "lato-300-main.png"), {
    x: 0.45,
    y: 0.0,
    w: 0.55,
    h: 1.0,
  });

  await productFromPct(sources.latoClean, path.join(OUT, "lato-split-main.png"), {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  });

  /** EN SITUATION : photo dédiée (toiture). Sinon même coupe que le produit. */
  async function latoSituationOrDup(sceneSrc, outBasename, dupCrop) {
    const dest = path.join(OUT, outBasename);
    if (!fs.existsSync(sceneSrc)) {
      console.warn("Absent:", sceneSrc, "→ fallback produit pour", outBasename);
      await productFromPct(sources.latoClean, dest, dupCrop);
      return;
    }

    await sharp(sceneSrc)
      .resize(FRAME_W, FRAME_H, {
        fit: "cover",
        position: "centre",
        kernel: sharp.kernel.lanczos3,
      })
      .png({ compressionLevel: 9 })
      .toFile(dest);

    console.log("->", path.relative(root, dest), "(situation)");
  }

  await latoSituationOrDup(
    fs.existsSync(sources.latoInstall150House) ? sources.latoInstall150House : sources.latoInstall150Scene,
    "lato-150-install.png",
    {
    x: 0.0,
    y: 0.0,
    w: 0.45,
    h: 1.0,
    },
  );

  await latoSituationOrDup(sources.latoInstallDualScene, "lato-200-install.png", {
    x: 0.45,
    y: 0.0,
    w: 0.55,
    h: 1.0,
  });

  await latoSituationOrDup(sources.latoInstallDualScene, "lato-300-install.png", {
    x: 0.45,
    y: 0.0,
    w: 0.55,
    h: 1.0,
  });

  await latoSituationOrDup(sources.latoInstallDualScene, "lato-split-install.png", {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  });

  console.log("Done:", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
