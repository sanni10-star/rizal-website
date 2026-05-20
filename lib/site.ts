export const SITE = {
  name: "RIZAL",
  tagline: "Luxury Home & Hardware Solutions",
  authority: "N°1 au Maroc",
  domain: "rizal.click",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rizal.click",
  ogImage: "/og-image.svg",
  whatsappPhone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "212630730350",
  whatsappDisplay: "06 30 73 03 50",
  email: "entrepriserizal@gmail.com",
  address: "Essaouira, Maroc",
  googleMaps: "https://maps.google.com/maps/search/Rizal%20Sarl/@31.510543823242188,-9.760002136230469,17z?hl=en",
  cities: ["Essaouira"] as const,
  hours: "Lundi - Samedi : 9h - 19h",
  socials: {
    facebook: "https://facebook.com/rizal.maroc",
    instagram: "https://instagram.com/rizal.maroc",
    tiktok: "https://tiktok.com/@rizal.maroc",
    youtube: "https://youtube.com/@rizal.maroc",
  },
  locales: ["fr", "ar", "en"] as const,
  defaultLocale: "fr" as const,
  legal: {
    raisonSociale: "RIZAL SARL",
    rc: "À compléter",
    ice: "À compléter",
    if: "À compléter",
    capital: "À compléter",
    siege: "Essaouira, Maroc",
  },
} as const;

export type SiteConfig = typeof SITE;
