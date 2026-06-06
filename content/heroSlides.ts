export type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  badgeAr: string;
  badgeArTransliteration?: string;
  titleFr: string;
  subtitleFr: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "hvac",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=75&auto=format&fit=crop",
    imageAlt: "Salon de villa contemporaine équipée d'une climatisation LG ARTCOOL",
    badgeAr: "أفضل العروض",
    badgeArTransliteration: "Meilleures offres",
    titleFr: "La Climatisation des Villas d'Exception.",
    subtitleFr:
      "MEGALIFE · INGELEC · LG · TRANE — gammes officielles, installation certifiée, garantie constructeur.",
    ctaPrimary: { label: "Découvrir la Climatisation", href: "/climatisation" },
    ctaSecondary: { label: "Parler à un Expert", href: "#whatsapp" },
  },
  {
    id: "magasin",
    image: "/img/hero/rizal-magasin.jpg",
    imageAlt: "Showroom RIZAL — magasin multi-services à Essaouira",
    badgeAr: "خبرة محلية · جودة عالمية",
    badgeArTransliteration: "Expertise locale · Qualité mondiale",
    titleFr: "Votre Showroom RIZAL.",
    subtitleFr:
      "Plomberie, énergie solaire, électricité, climatisation, piscine, construction — tout sous un même toit.",
    ctaPrimary: { label: "Nous Contacter", href: "/contact" },
    ctaSecondary: { label: "Parler à un Expert", href: "#whatsapp" },
  },
  {
    id: "solaire",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=75&auto=format&fit=crop",
    imageAlt: "Toiture villa avec panneaux solaires premium et onduleur Huawei",
    badgeAr: "شحن سريع · ضمان ٢٥ سنة",
    badgeArTransliteration: "Livraison rapide · Garantie 25 ans",
    titleFr: "L'Énergie Solaire Haut de Gamme.",
    subtitleFr:
      "Panneaux Tier 1, onduleurs hybrides, batteries lithium — autonomie totale pour votre villa.",
    ctaPrimary: { label: "Configurer mon Kit Solaire", href: "/energie-solaire" },
    ctaSecondary: { label: "Parler à un Expert", href: "#whatsapp" },
  },
];
