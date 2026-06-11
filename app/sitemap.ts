import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { catalog, brandSlug } from "@/content/catalog";
import { SITEMAP_SERVICE_ROUTES } from "@/content/navigation";

/** Core Essaouira service pages — highest SEO priority. */
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

function priorityFor(path: string): number {
  if (path === "/") return 1.0;
  if ((ESSAOUIRA_SERVICES as readonly string[]).includes(path)) return 0.95;
  if (path === "/contact" || path === "/realisations") return 0.8;
  return 0.7;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const brandRoutes = ["megalife", "ingelec", "lg", "trane"].map(
    (b) => `/climatisation/${b}`,
  );

  const climGammeRoutes = catalog
    .filter((c) => c.category === "climatisation" && c.brand)
    .map((c) => `/climatisation/${brandSlug(c.brand!)}/${c.id}`);

  const solaireGammeRoutes = catalog
    .filter((c) => c.category === "solaire")
    .map((c) => `/energie-solaire/${c.id}`);

  const allPaths = [
    ...new Set([
      ...STATIC_ROUTES,
      ...brandRoutes,
      ...climGammeRoutes,
      ...solaireGammeRoutes,
    ]),
  ];

  return allPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: priorityFor(path),
  }));
}
