import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { catalog, brandSlug } from "@/content/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "/",
    "/climatisation",
    "/energie-solaire",
    "/energie-solaire/marques-solaire-thermique",
    "/services/piscine",
    "/services/renovation-villa",
    "/services/traitement-eau",
    "/realisations",
    "/a-propos",
    "/contact",
    "/mentions-legales",
    "/cgv",
    "/cgu",
    "/politique-confidentialite",
    "/politique-cookies",
    "/garanties",
  ];

  const brandRoutes = ["megalife", "ingelec", "lg", "trane"].map(
    (b) => `/climatisation/${b}`,
  );

  const climGammeRoutes = catalog
    .filter((c) => c.category === "climatisation" && c.brand)
    .map((c) => `/climatisation/${brandSlug(c.brand!)}/${c.id}`);

  const solaireGammeRoutes = catalog
    .filter((c) => c.category === "solaire")
    .map((c) => `/energie-solaire/${c.id}`);

  return [
    ...staticRoutes,
    ...brandRoutes,
    ...climGammeRoutes,
    ...solaireGammeRoutes,
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
