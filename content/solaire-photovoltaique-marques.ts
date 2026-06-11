/** Marques panneaux photovoltaïques Tier 1 — 500 à 700 Wc. */
export type SolairePvMarque = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  powerRange: string;
  /** Photo installation sur toiture / villa */
  installImage: string;
  installImageAlt: string;
  image: string;
  logo: string;
  accent: string;
  /** Couleur secondaire logo (ex. point rouge Trina, rouge Canadian Solar). */
  accentSecondary?: string;
  accentLight: string;
  bgGradient: string;
};

const PANELS = "/img/solaire/panels";
const PRODUCTS = `${PANELS}/products`;
const INSTALL = `${PANELS}/install/essaouira`;

export const solairePhotovoltaiqueMarques: SolairePvMarque[] = [
  {
    id: "jinko",
    catalogId: "panneau-jinko-tiger-neo",
    name: "Jinko Solar",
    series: "Tiger Neo N-Type",
    tagline: "N°1 mondial · TOPCon",
    description:
      "Cellules N-Type TOPCon, rendement jusqu'à 23 %, excellent en climat chaud — idéal pour les toitures villa au Maroc.",
    powerRange: "500 – 620 Wc",
    installImage: `${INSTALL}/jinko-essaouira-install.jpg`,
    installImageAlt:
      "Panneaux Jinko Tiger Neo installés sur villa blanche — Essaouira",
    image: `${PRODUCTS}/jinko-tiger-neo-product.jpg`,
    logo: `${PANELS}/logo-jinko.svg`,
    accent: "#1B8F3A",
    accentLight: "#E8F5EC",
    bgGradient: "linear-gradient(145deg, #0a3d1c 0%, #145c2a 45%, #0d2818 100%)",
  },
  {
    id: "ja-solar",
    catalogId: "panneau-ja-solar-deepblue",
    name: "JA Solar",
    series: "DeepBlue 4.0 Pro",
    tagline: "Haute efficacité · Tier 1",
    description:
      "Modules monocristallins DeepBlue 4.0, faible dégradation, performance stable — référence pour autoconsommation résidentielle.",
    powerRange: "500 – 600 Wc",
    installImage: `${INSTALL}/ja-solar-essaouira-install.jpg`,
    installImageAlt:
      "Installation JA Solar DeepBlue sur villa marocaine — Essaouira",
    image: `${PRODUCTS}/ja-solar-deepblue-product.jpg`,
    logo: `${PANELS}/logo-ja-solar.svg`,
    accent: "#0054A4",
    accentLight: "#E6F0FA",
    bgGradient: "linear-gradient(145deg, #002855 0%, #00408a 45%, #001a3d 100%)",
  },
  {
    id: "trina",
    catalogId: "panneau-trina-vertex",
    name: "Trina Solar",
    series: "Vertex S+",
    tagline: "Puissance maximale",
    description:
      "Série Vertex S+ compacte et haute puissance, technologie multi-busbar — parfaite pour maximiser la production sur toiture limitée.",
    powerRange: "500 – 700 Wc",
    installImage: `${INSTALL}/trina-essaouira-install.jpg`,
    installImageAlt:
      "Panneaux Trina Vertex S+ sur villa avec piscine — Essaouira",
    image: `${PRODUCTS}/trina-vertex-product.jpg`,
    logo: `${PANELS}/logo-trina.svg`,
    accent: "#008CD6",
    accentSecondary: "#E60012",
    accentLight: "#E6F7FD",
    bgGradient: "linear-gradient(145deg, #003d5c 0%, #006699 45%, #002840 100%)",
  },
  {
    id: "canadian",
    catalogId: "panneau-canadian-solar",
    name: "Canadian Solar",
    series: "TOPHiKu6 / HiHero",
    tagline: "Fiabilité éprouvée",
    description:
      "Panneaux TOPCon all-black disponibles, garantie produit 15 ans et production 30 ans — esthétique soignée pour villas premium.",
    powerRange: "500 – 665 Wc",
    installImage: `${INSTALL}/canadian-essaouira-install.jpg`,
    installImageAlt:
      "Modules Canadian Solar all-black sur riad — Essaouira",
    image: `${PRODUCTS}/canadian-solar-product.jpg`,
    logo: `${PANELS}/logo-canadian-solar.svg`,
    accent: "#003DA5",
    accentSecondary: "#C8102E",
    accentLight: "#E8EEF8",
    bgGradient: "linear-gradient(145deg, #002B5C 0%, #003D7A 45%, #001A3D 100%)",
  },
];
