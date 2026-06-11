const pages = [
  "https://www.neotechsecurity.com/en/wireless-pir-detectors/hikvision-ds-pdp15p-eg2-we-wireless-pir-detector",
  "https://www.neotechsecurity.com/en/wireless-magnetic-contacts/hikvision-ds-pdmc-eg2-we-wireless-magnetic-contact",
  "https://www.neotechsecurity.com/en/wireless-intrusion-alarm-control-panels/hikvision-ds-pwa64-l-we-ax-pro-wireless-control-panel-64-zones",
];

for (const url of pages) {
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await r.text();
  const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  console.log(url.split("/").pop(), og);
}
