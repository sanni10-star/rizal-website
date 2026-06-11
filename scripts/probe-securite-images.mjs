import fs from "fs";
import sharp from "sharp";

const urls = [
  ["cam-n3", "https://www.neotechsecurity.com/12457-large_default/hikvision-4mp-colorvu-acusense-ip-bullet-camera-ds-2cd2047g2h-liu-sl28-ef-black.jpg"],
  ["cam-hik-dam", "https://www.hikvision.com/content/dam/hikvision/en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2047g2-lu/Resources/DS-2CD2047G2-LU.png"],
  ["cam-hik-dam2", "https://www.hikvision.com/content/dam/hikvision/en/products/IP-Products/Network-Cameras/Pro-Series-EasyIP-/ds-2cd2047g2-lu/DS-2CD2047G2-LU.png"],
  ["ax-panel", "https://www.neotechsecurity.com/10347-large_default/centrale-d-alarme-sans-fil-hikvision-ds-pwa64-l-we.jpg"],
  ["ax-kit", "https://www.neotechsecurity.com/10400-large_default/hikvision-ds-pwa64-kit-we-kit-alarme-sans-fil-ax-pro.jpg"],
  ["fumee", "https://www.securimport.com/web/image/product.template/23126/image_1920?unique=4124252"],
  ["fumee-may", "https://media.mayflex.com/images/SHIK005/Renders.png.thumb.1280.1280_800px.jpg"],
  ["imou-flyer", "C:/Users/PC/.cursor/projects/c-Users-PC-cursor/assets/c__Users_PC_AppData_Roaming_Cursor_User_workspaceStorage_dda733729ea512b8103dc01fe690dd59_images_image-ba7f1682-0fb4-44ab-9509-bd83155c5d75.png"],
];

const outDir = "public/img/categories/securite/probe";
fs.mkdirSync(outDir, { recursive: true });

for (const [name, url] of urls) {
  try {
    let buf;
    if (url.startsWith("C:")) {
      buf = fs.readFileSync(url);
    } else {
      const r = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0", Referer: "https://www.neotechsecurity.com/" },
      });
      if (!r.ok) {
        console.log("FAIL", name, r.status);
        continue;
      }
      buf = Buffer.from(await r.arrayBuffer());
    }
    if (name === "imou-flyer") {
      buf = await sharp(buf)
        .extract({ left: 420, top: 140, width: 340, height: 620 })
        .png()
        .toBuffer();
    }
    await sharp(buf).jpeg({ quality: 92 }).toFile(`${outDir}/${name}.jpg`);
    const m = await sharp(buf).metadata();
    console.log("OK", name, m.width, m.height, buf.length);
  } catch (e) {
    console.log("ERR", name, e.message);
  }
}
