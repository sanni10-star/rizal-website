import { SITE } from "./site";
import type { Metadata } from "next";

type SeoArgs = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
}: SeoArgs = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE.name} — ${SITE.authority}`
    : `${SITE.name} — ${SITE.tagline} | ${SITE.authority}`;

  const desc =
    description ??
    `RIZAL, ${SITE.authority} pour la climatisation premium, l'énergie solaire, la rénovation de villas, la construction de piscines et le traitement d'eau. MEGALIFE · INGELEC · LG · TRANE. Délais respectés, garantie constructeur.`;

  const url = `${SITE.url}${path}`;
  const ogImage = image || SITE.ogImage;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
      languages: {
        "fr-MA": url,
        "ar-MA": `${SITE.url}/ar${path === "/" ? "" : path}`,
        en: `${SITE.url}/en${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE.name,
      locale: "fr_MA",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg" },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: `${SITE.tagline}. ${SITE.authority}.`,
    url: SITE.url,
    telephone: `+${SITE.whatsappPhone}`,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
    },
    areaServed: SITE.cities.map((city) => ({ "@type": "City", name: city })),
    sameAs: Object.values(SITE.socials),
    openingHours: "Mo-Sa 09:00-19:00",
    image: `${SITE.url}${SITE.ogImage}`,
  };
}

export function productJsonLd(args: {
  name: string;
  description: string;
  brand?: string;
  category?: string;
  image: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: args.name,
    description: args.description,
    brand: args.brand
      ? { "@type": "Brand", name: args.brand }
      : undefined,
    category: args.category,
    image: args.image || `${SITE.url}${SITE.ogImage}`,
    url: args.url,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
