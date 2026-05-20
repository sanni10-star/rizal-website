/**
 * Produits / marques alignés sur les fiches PDF partagées (chauffe-eau solaire émaillé,
 * catalogue LATO/Teliko, certificat Solar Keymark Sonne Aktion).
 * Remplacez les images par vos visuels officiels constructeur si besoin.
 */
export type SolaireDocBrand = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Visuel principal (généré ou photo constructeur) */
  heroImage: string;
  highlights: string[];
  /** Thème issu des PDF (pour traçabilité interne) */
  sourceNote: string;
};

export const solaireDocBrands: SolaireDocBrand[] = [
  {
    id: "lato-thermosiphon-emaille",
    name: "LATO — Chauffe-eau solaire émaillé",
    tagline: "Thermosiphon · réservoir émaillé · catalogue LATO / Teliko",
    description:
      "Système solaire thermique compact : circulation naturelle (thermosiphon), ballon de stockage avec revêtement émaillé pour une eau saine et une longévité accrue. Idéal villas Maroc fort ensoleillement.",
    heroImage: "/img/solaire/products/lato-thermosiphon-emaille-hero.jpg",
    highlights: [
      "Circulation naturelle sans circulateur",
      "Réservoir émaillé haute résistance",
      "Dimensionnement 90 à 300 L selon besoin",
    ],
    sourceNote:
      "PDF « CHAUFFE EAU SOLAIRE EMAILLE » + « LATO_A4_EN_TELIKO_2204 » (Teliko / LATO)",
  },
  {
    id: "sonne-aktion-keymark",
    name: "Sonne Aktion — Capteurs Solar Keymark",
    tagline: "Qualité européenne certifiée Keymark",
    description:
      "Gamme de capteurs solaires thermiques certifiés Solar Keymark : performance mesurée, traçabilité et éligibilité aux exigences qualité européennes pour projets exigeants.",
    heroImage: "/img/solaire/products/sonne-aktion-collectors-hero.jpg",
    highlights: [
      "Certification Solar Keymark",
      "Collecteurs haut rendement",
      "Intégration toiture villa & ECS",
    ],
    sourceNote: "PDF « CERTIFICAT SOLAIRE SONNE AKTION KEYMARK »",
  },
];

/** Scènes d’installation (visuels générés, ambiance Maroc / premium) */
export const solaireInstallScenes = [
  {
    id: "toiture-thermosiphon",
    title: "Toiture — champ captif + ballon",
    caption: "Thermosiphon discret sur toit-terrasse : capteurs + stockage.",
    image: "/img/solaire/install/toiture-villa-maroc.jpg",
  },
  {
    id: "local-technique",
    title: "Local technique — régulation & stockage",
    caption: "Intégration propre : onduleur hybride, batteries, câblage DC.",
    image: "/img/solaire/install/onduleur-batteries-technique.jpg",
  },
] as const;
