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
    image: "/img/categories/climatisation.jpg",
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
    image: "/img/solaire/panels/panneau-tier1-hero.jpg",
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
