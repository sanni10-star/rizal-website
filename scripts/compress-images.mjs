import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "img");
const THRESHOLD = 300 * 1024;
const MAX_WIDTH = 1600;
const QUALITY = 78;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

let saved = 0;
let count = 0;

for (const file of walk(ROOT)) {
  const stat = fs.statSync(file);
  if (stat.size <= THRESHOLD) continue;

  const ext = path.extname(file).toLowerCase();
  const tmp = `${file}.tmp`;
  const pipeline = sharp(file).rotate().resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
  });

  if (ext === ".png") {
    await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);
    const next = file.replace(/\.png$/i, ".jpg");
    fs.renameSync(tmp, next);
    if (next !== file) fs.unlinkSync(file);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: QUALITY }).toFile(tmp);
    fs.renameSync(tmp, file);
  } else {
    await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);
    fs.renameSync(tmp, file);
  }

  const nextSize = fs.statSync(ext === ".png" ? file.replace(/\.png$/i, ".jpg") : file).size;
  saved += stat.size - nextSize;
  count += 1;
  console.log(`${(stat.size / 1024 / 1024).toFixed(2)}MB -> ${(nextSize / 1024 / 1024).toFixed(2)}MB  ${path.relative(process.cwd(), file)}`);
}

console.log(`Compressed ${count} files, saved ${(saved / 1024 / 1024).toFixed(2)}MB`);
