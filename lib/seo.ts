import { SITE } from "./site";
import type { Metadata } from "next";

type SeoArgs = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  keywords,
}: SeoArgs = {}): Metadata {
  const { localSeo } = SITE;
  const city = localSeo.city;

  const fullTitle = title
    ? `${title} | ${SITE.name} — ${SITE.authority}`
    : `Droguerie & Construction ${city} — Quincaillerie, Climatiseur, Piscine | ${SITE.name}`;

  const desc =
    description ??
    `RIZAL à ${city} : droguerie, construction, climatiseur, piscine et panneau solaire. Showroom à Tamanar, intervention Essaouira et région. Devis gratuit.`;

  const url = `${SITE.url}${path}`;
  const ogImage = image || SITE.ogImage;
  const metaKeywords = keywords ?? [...localSeo.keywords];
  const { latitude, longitude } = localSeo.geo;

  return {
    title: fullTitle,
    description: desc,
    keywords: metaKeywords,
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — quincaillerie et droguerie à ${city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg" },
    other: {
      "geo.region": "MA-ES",
      "geo.placename": city,
      "geo.position": `${latitude};${longitude}`,
      ICBM: `${latitude}, ${longitude}`,
    },
  };
}

export function localBusinessJsonLd() {
  const { localSeo } = SITE;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store", "HomeImprovementStore", "GeneralContractor"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: `Droguerie, quincaillerie et construction à ${localSeo.city} et province : climatiseur, piscine, panneau solaire. ${SITE.tagline}.`,
    url: SITE.url,
    telephone: `+${SITE.whatsappPhone}`,
    email: SITE.email,
    image: `${SITE.url}${SITE.ogImage}`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: localSeo.streetAddress,
      addressLocality: localSeo.locality,
      addressRegion: localSeo.region,
      postalCode: localSeo.postalCode,
      addressCountry: localSeo.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: localSeo.geo.latitude,
      longitude: localSeo.geo.longitude,
    },
    areaServed: SITE.cities.map((city) => ({ "@type": "City", name: city })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: Object.values(SITE.socials),
    knowsAbout: [...localSeo.keywords],
    hasMap: SITE.googleMaps,
  };
}

export function localServiceJsonLd(args: {
  name: string;
  description: string;
  path: string;
}) {
  const { localSeo } = SITE;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: `${SITE.url}${args.path}`,
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: {
      "@type": "City",
      name: localSeo.city,
    },
    serviceType: args.name,
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
