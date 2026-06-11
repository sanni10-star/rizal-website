import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const products = path.join(root, "public/img/solaire/variateurs/products");
const install = path.join(root, "public/img/solaire/variateurs/install");

async function productCover(input, output, w = 1600, h = 1200) {
  await sharp(input)
    .trim({ threshold: 12 })
    .resize(w, h, { fit: "cover", position: "centre" })
    .sharpen()
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(output);
  console.log("->", path.relative(root, output));
}

const veichiSrc =
  process.env.VEICHI_SRC ||
  "C:/Users/PC/.cursor/projects/c-Users-PC-cursor/assets/c__Users_PC_AppData_Roaming_Cursor_User_workspaceStorage_dda733729ea512b8103dc01fe690dd59_images_image-b91d11a6-1b32-4c94-9c63-40fd94dc705b.png";

await productCover(veichiSrc, path.join(products, "veichi-variateur-product.jpg"));

const invtSrc = path.join(products, "invt-variateur-product-source.jpg");
if (fs.existsSync(invtSrc)) {
  await productCover(invtSrc, path.join(products, "invt-variateur-product.jpg"));
}
