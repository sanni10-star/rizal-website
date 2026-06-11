/** Page catalogue pompes piscine — Astralpool, DAB & Waterpool Orion. */
export const PISCINE_MARQUES_POMPES_PATH =
  "/services/piscine/marques-pompes" as const;

export type PiscinePompeSpec = { label: string; value: string };

export type PiscinePompeProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: PiscinePompeSpec[];
  image: string;
  imageInstall: string;
  imageInstallAlt: string;
};

export type PiscinePompeMarqueSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  products: PiscinePompeProduct[];
};

const POMPES = "/img/piscine/pompes";
const PRODUCTS = `${POMPES}/products`;
const INSTALL = `${POMPES}/install`;
const LOGOS = `${POMPES}/logos`;

export const piscinePompeMarqueSections: PiscinePompeMarqueSection[] = [
  {
    id: "astralpool",
    title: "Astralpool",
    tagline: "Victoria Plus · Filtration premium",
    intro:
      "Pompes de filtration Astralpool Victoria Plus — référence mondiale pour piscines résidentielles. Auto-amorçantes, inox AISI-316, panier 5 L et fonctionnement silencieux.",
    brandLogo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    products: [
      {
        id: "pompe-astralpool-victoria-monophase",
        catalogId: "pompe-astralpool-victoria-plus",
        name: "Astralpool Victoria Plus — Monophasé",
        series: "220 V · 0,5 – 3 CV",
        summary:
          "Pompe monophasée 220 V Victoria Plus NG — filtration silencieuse, panier 5 L, débit jusqu'à 34 m³/h.",
        image: `${PRODUCTS}/astralpool-victoria-product.jpg`,
        imageInstall: `${INSTALL}/astralpool-install-villa.jpg`,
        imageInstallAlt: "Pompe Astralpool Victoria monophasée — installation villa",
        specs: [
          { label: "Phase", value: "Monophasé 220 V" },
          { label: "Modèle", value: "Victoria Plus NG" },
          { label: "Puissance", value: "0,5 – 3 CV" },
          { label: "Préfiltre", value: "5 litres" },
        ],
      },
      {
        id: "pompe-astralpool-victoria-triphase",
        catalogId: "pompe-astralpool-victoria-plus",
        name: "Astralpool Victoria Plus — Triphasé",
        series: "380 V · 0,5 – 3 CV",
        summary:
          "Pompe triphasée 380 V Victoria Plus — haut débit pour grands bassins, moteur IP-55, inox 316.",
        image: `${PRODUCTS}/astralpool-victoria-product.jpg`,
        imageInstall: `${INSTALL}/astralpool-install-villa.jpg`,
        imageInstallAlt: "Pompe Astralpool Victoria triphasée — local technique piscine",
        specs: [
          { label: "Phase", value: "Triphasé 380 V" },
          { label: "Modèle", value: "Victoria Plus NG" },
          { label: "Puissance", value: "0,5 – 3 CV" },
          { label: "Bruit", value: "61 – 70 dBA" },
        ],
      },
    ],
  },
  {
    id: "dab",
    title: "DAB",
    tagline: "Euroswim · Pompe filtration",
    intro:
      "Pompes DAB série Euroswim — conception italienne, haut rendement hydraulique, préfiltre transparent grande capacité. Adaptées chlore, sel et eau de mer.",
    brandLogo: `${LOGOS}/logo-dab.svg`,
    accent: "#E30613",
    products: [
      {
        id: "pompe-dab-euroswim-monophase",
        catalogId: "pompe-dab-euroswim",
        name: "DAB Euroswim — Monophasé",
        series: "220 V · 0,5 – 3 CV",
        summary:
          "Pompe DAB Euroswim monophasée 220 V — auto-amorçante, silent-blocs, débit jusqu'à 42 m³/h, aspiration 2 m.",
        image: `${PRODUCTS}/dab-euroswim-product.jpg`,
        imageInstall: `${INSTALL}/dab-install-villa.jpg`,
        imageInstallAlt: "Pompe DAB Euroswim monophasée installée — villa Essaouira",
        specs: [
          { label: "Phase", value: "Monophasé 220 V" },
          { label: "Série", value: "Euroswim" },
          { label: "Puissance", value: "0,5 – 3 CV" },
          { label: "Débit max", value: "42 m³/h" },
        ],
      },
      {
        id: "pompe-dab-euroswim-triphase",
        catalogId: "pompe-dab-euroswim",
        name: "DAB Euroswim — Triphasé",
        series: "380 V · 0,55 – 3 CV",
        summary:
          "Pompe DAB Euroswim triphasée 380 V — filtration puissante pour piscines et bassins exigeants, IP55.",
        image: `${PRODUCTS}/dab-euroswim-product.jpg`,
        imageInstall: `${INSTALL}/dab-install-villa.jpg`,
        imageInstallAlt: "Pompe DAB Euroswim triphasée — filtration piscine",
        specs: [
          { label: "Phase", value: "Triphasé 380 V" },
          { label: "Série", value: "Euroswim" },
          { label: "Puissance", value: "0,55 – 3 CV" },
          { label: "Eau de mer", value: "Compatible" },
        ],
      },
    ],
  },
  {
    id: "waterpool",
    title: "Waterpool",
    tagline: "Orion · Pompe auto-amorçante",
    intro:
      "Pompes Waterpool Orion — robustes, moteur résiné, arbre inox AISI 316L. Références 04PS0231 à 04PS0242, de 3/4 à 3 CV en mono et tri.",
    brandLogo: `${LOGOS}/logo-waterpool.svg`,
    accent: "#0077B6",
    products: [
      {
        id: "pompe-waterpool-orion-monophase",
        catalogId: "pompe-waterpool-orion",
        name: "Waterpool Orion — Monophasé",
        series: "220 V · 3/4 – 3 CV",
        summary:
          "Pompe Waterpool Orion monophasée 220 V — préfiltre transparent, protection thermique, compatible eau salée.",
        image: `${PRODUCTS}/waterpool-orion-product.jpg`,
        imageInstall: `${INSTALL}/waterpool-install-villa.jpg`,
        imageInstallAlt: "Pompe Waterpool Orion monophasée — piscine villa Maroc",
        specs: [
          { label: "Phase", value: "Monophasé 220 V" },
          { label: "Modèle", value: "Orion" },
          { label: "Puissance", value: "3/4 – 3 CV" },
          { label: "Réf.", value: "04PS0231 – 04PS0239" },
        ],
      },
      {
        id: "pompe-waterpool-orion-triphase",
        catalogId: "pompe-waterpool-orion",
        name: "Waterpool Orion — Triphasé",
        series: "380 V · 3/4 – 3 CV",
        summary:
          "Pompe Waterpool Orion triphasée 380 V — haute puissance, girante Noryl, idéale grands débits de filtration.",
        image: `${PRODUCTS}/waterpool-orion-product.jpg`,
        imageInstall: `${INSTALL}/waterpool-install-villa.jpg`,
        imageInstallAlt: "Pompe Waterpool Orion triphasée installée — Essaouira",
        specs: [
          { label: "Phase", value: "Triphasé 380 V" },
          { label: "Modèle", value: "Orion" },
          { label: "Puissance", value: "3/4 – 3 CV" },
          { label: "Réf.", value: "04PS0232 – 04PS0242" },
        ],
      },
    ],
  },
];
