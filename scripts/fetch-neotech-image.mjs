import fs from "fs";
import sharp from "sharp";

const pages = [
  "https://www.neotechsecurity.com/en/ip-bullet-cameras/hikvision-4mp-colorvu-acusense-ip-bullet-camera-ds-2cd2047g2h-liu-sl28-ef-black",
  "https://www.neotechsecurity.com/en/wireless-intrusion-alarm-control-panels/hikvision-ds-pwa64-l-we-ax-pro-wireless-control-panel",
  "https://www.neotechsecurity.com/en/wireless-intrusion-alarm-kits/hikvision-ds-pwa64-kit-we-ax-pro-wireless-alarm-kit",
  "https://www.neotechsecurity.com/fr/kits-alarme-sans-fil/kit-alarme-sans-fil-hikvision-ax-pro-ds-pwa64-kit-we.html",
  "https://www.neotechsecurity.com/en/wireless-intrusion-alarm-control-panels/hikvision-ax-pro-ds-pwa64-l-we-wireless-control-panel-64-zones",
  "https://www.neotechsecurity.com/en/hikvision-ax-pro-intruder-alarm-control-panels/1867-ds-pwa64-l-we-6941264061366.html",
  "https://www.neotechsecurity.com/fr/centrales-alarme-sans-fil/centrale-alarme-sans-fil-hikvision-ds-pwa64-l-we.html",
];

for (const url of pages) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await r.text();
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  const imgs = [...html.matchAll(/https:\/\/neotechsecurity\.com\/\d+-(?:large|superlarge|thickbox)[^"']+\.jpg/g)].map(
    (m) => m[0],
  );
  console.log("\n===", url.split("/").pop(), "===");
  console.log("og:", og);
  [...new Set(imgs)].slice(0, 8).forEach((u) => console.log(u));
}

const testUrls = [
  "https://neotechsecurity.com/7336-large_default_2x/hikvision-4mp-colorvu-acusense-ip-bullet-camera-ds-2cd2047g2h-liu-sl28-ef-black.jpg",
  "https://neotechsecurity.com/10348-large_default/kit-alarme-sans-fil-hikvision-ax-pro-ds-pwa64-kit-we.jpg",
  "https://neotechsecurity.com/10348-superlarge_default_2x/kit-alarme-sans-fil-hikvision-ax-pro-ds-pwa64-kit-we.jpg",
  "https://neotechsecurity.com/9232-large_default/ds-pwa64-l-we-6941264061366.jpg",
  "https://neotechsecurity.com/9232-superlarge_default_2x/ds-pwa64-l-we-6941264061366.jpg",
];
console.log("\n=== direct tests ===");
for (const u of testUrls) {
  const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
  const b = Buffer.from(await r.arrayBuffer());
  if (b.length > 8000) {
    await sharp(b).jpeg().toFile(`public/img/categories/securite/probe/test-${u.split("/")[3].split("-")[0]}.jpg`);
    console.log("SAVED", u.split("/").pop(), b.length);
  } else console.log("skip", r.status, b.length, u);
}
