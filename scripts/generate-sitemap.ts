import fs from "fs";
import path from "path";
import { catalog, brandSlug } from "../content/catalog";
import { SITEMAP_SERVICE_ROUTES } from "../content/navigation";
import { SITE } from "../lib/site";

const ESSAOUIRA_SERVICES = [
  "/climatisation",
  "/services/piscine",
  "/energie-solaire",
  "/services/renovation-villa",
  "/services/droguerie-essaouira",
  "/services/construction-essaouira",
] as const;

const STATIC_ROUTES = [
  "/",
  ...ESSAOUIRA_SERVICES,
  "/energie-solaire/marques-solaire-thermique",
  "/energie-solaire/marques-photovoltaiques",
  "/energie-solaire/marques-variateur-solaire",
  ...SITEMAP_SERVICE_ROUTES,
  "/realisations",
  "/a-propos",
  "/contact",
  "/blog",
  "/mentions-legales",
  "/cgv",
  "/cgu",
  "/politique-confidentialite",
  "/politique-cookies",
  "/garanties",
] as const;

function priorityFor(route: string): number {
  if (route === "/") return 1.0;
  if ((ESSAOUIRA_SERVICES as readonly string[]).includes(route)) return 0.95;
  if (route === "/contact" || route === "/realisations") return 0.8;
  return 0.7;
}

function buildPaths(): string[] {
  const brandRoutes = ["megalife", "ingelec", "lg", "trane"].map((b) => `/climatisation/${b}`);
  const climGammeRoutes = catalog
    .filter((c) => c.category === "climatisation" && c.brand)
    .map((c) => `/climatisation/${brandSlug(c.brand!)}/${c.id}`);
  const solaireGammeRoutes = catalog
    .filter((c) => c.category === "solaire")
    .map((c) => `/energie-solaire/${c.id}`);

  return [
    ...new Set([
      ...STATIC_ROUTES,
      ...brandRoutes,
      ...climGammeRoutes,
      ...solaireGammeRoutes,
    ]),
  ];
}

function toXml(paths: string[]): string {
  const now = new Date().toISOString();
  const urls = paths
    .map((route) => {
      const loc = `${SITE.url}${route}`;
      const priority = priorityFor(route);
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const paths = buildPaths();
const out = path.join(process.cwd(), "public", "sitemap.xml");
fs.writeFileSync(out, toXml(paths), "utf8");
console.log(`sitemap.xml written: ${paths.length} URLs -> ${out}`);
