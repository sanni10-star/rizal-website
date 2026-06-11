/** Page catalogue panneaux photovoltaïques Tier 1 (Jinko, JA Solar, Trina, Canadian Solar). */
export const SOLAIRE_MARQUES_PHOTOVOLTAIQUE_PATH =
  "/energie-solaire/marques-photovoltaiques" as const;

export type SolairePvSpec = { label: string; value: string };

export type SolairePvProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: SolairePvSpec[];
  /** Visuel produit (packshot catalogue). */
  image: string;
  /** Mise en situation villa Essaouira. */
  imageInstall: string;
  imageInstallAlt: string;
};

export type SolairePvMarqueSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  accentSecondary?: string;
  product: SolairePvProduct;
};

const PANELS = "/img/solaire/panels";
const PRODUCTS = `${PANELS}/products`;
const INSTALL = `${PANELS}/install/essaouira`;

export const solairePhotovoltaiqueMarqueSections: SolairePvMarqueSection[] = [
  {
    id: "jinko",
    title: "Jinko Solar",
    tagline: "N°1 mondial · TOPCon",
    intro:
      "Tiger Neo N-Type TOPCon — rendement jusqu'à 23 %, excellent en climat chaud. Référence Tier 1 pour autoconsommation villa au Maroc.",
    brandLogo: `${PANELS}/logo-jinko.svg`,
    accent: "#1B8F3A",
    product: {
      id: "panneau-jinko-tiger-neo",
      catalogId: "panneau-jinko-tiger-neo",
      name: "Tiger Neo N-Type",
      series: "500 – 620 Wc",
      summary:
        "Cellules N-Type TOPCon HOT 3.0, faible dégradation, performance optimale sur toiture villa à Essaouira.",
      image: `${PRODUCTS}/jinko-tiger-neo-product.jpg`,
      imageInstall: `${INSTALL}/jinko-essaouira-install.jpg`,
      imageInstallAlt:
        "Panneaux Jinko Tiger Neo installés sur toiture villa blanche — Essaouira",
      specs: [
        { label: "Puissance", value: "500 – 620 Wc" },
        { label: "Technologie", value: "N-Type TOPCon" },
        { label: "Rendement", value: "Jusqu'à 23 %" },
        { label: "Garantie production", value: "25 ans" },
      ],
    },
  },
  {
    id: "ja-solar",
    title: "JA Solar",
    tagline: "Haute efficacité · Tier 1",
    intro:
      "DeepBlue 4.0 Pro — monocristallin PERC/TOPCon, faible coefficient de température. Idéal résidentiel et tertiaire.",
    brandLogo: `${PANELS}/logo-ja-solar.svg`,
    accent: "#0054A4",
    product: {
      id: "panneau-ja-solar-deepblue",
      catalogId: "panneau-ja-solar-deepblue",
      name: "DeepBlue 4.0 Pro",
      series: "500 – 600 Wc",
      summary:
        "Modules DeepBlue 4.0, performance stable en forte chaleur — référence pour villas à Essaouira et région.",
      image: `${PRODUCTS}/ja-solar-deepblue-product.jpg`,
      imageInstall: `${INSTALL}/ja-solar-essaouira-install.jpg`,
      imageInstallAlt:
        "Installation JA Solar DeepBlue sur villa marocaine — Essaouira",
      specs: [
        { label: "Puissance", value: "500 – 600 Wc" },
        { label: "Technologie", value: "Monocristallin PERC / TOPCon" },
        { label: "Rendement", value: "Jusqu'à 22,5 %" },
        { label: "Garantie production", value: "25 ans" },
      ],
    },
  },
  {
    id: "trina",
    title: "Trina Solar",
    tagline: "Puissance maximale",
    intro:
      "Vertex S+ — haute puissance compacte jusqu'à 700 Wc. Multi-busbar pour maximiser la production sur toiture limitée.",
    brandLogo: `${PANELS}/logo-trina.svg`,
    accent: "#008CD6",
    accentSecondary: "#E60012",
    product: {
      id: "panneau-trina-vertex",
      catalogId: "panneau-trina-vertex",
      name: "Vertex S+",
      series: "500 – 700 Wc",
      summary:
        "Format optimisé, record de puissance — parfait pour villas premium à forte consommation sur la côte atlantique.",
      image: `${PRODUCTS}/trina-vertex-product.jpg`,
      imageInstall: `${INSTALL}/trina-essaouira-install.jpg`,
      imageInstallAlt:
        "Panneaux Trina Vertex S+ sur villa avec piscine — Essaouira",
      specs: [
        { label: "Puissance", value: "500 – 700 Wc" },
        { label: "Technologie", value: "Monocristallin TOPCon" },
        { label: "Rendement", value: "Jusqu'à 22,8 %" },
        { label: "Garantie production", value: "25 ans" },
      ],
    },
  },
  {
    id: "canadian",
    title: "Canadian Solar",
    tagline: "Fiabilité éprouvée",
    intro:
      "TOPHiKu6 / HiHero — modules TOPCon all-black, esthétique soignée. Garantie produit 15 ans, production 30 ans.",
    brandLogo: `${PANELS}/logo-canadian-solar.svg`,
    accent: "#003DA5",
    accentSecondary: "#C8102E",
    product: {
      id: "panneau-canadian-solar",
      catalogId: "panneau-canadian-solar",
      name: "TOPHiKu6 / HiHero",
      series: "500 – 665 Wc",
      summary:
        "Panneaux all-black premium pour villas haut de gamme — intégration discrète sur toiture riad ou villa moderne.",
      image: `${PRODUCTS}/canadian-solar-product.jpg`,
      imageInstall: `${INSTALL}/canadian-essaouira-install.jpg`,
      imageInstallAlt:
        "Modules Canadian Solar all-black sur riad — Essaouira",
      specs: [
        { label: "Puissance", value: "500 – 665 Wc" },
        { label: "Technologie", value: "TOPCon all-black" },
        { label: "Rendement", value: "Jusqu'à 22,6 %" },
        { label: "Garantie production", value: "30 ans" },
      ],
    },
  },
];
