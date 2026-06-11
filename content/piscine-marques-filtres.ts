/** Page catalogue filtres à sable piscine — Astralpool, Waterpool & Aquarius. */
export const PISCINE_MARQUES_FILTRES_PATH =
  "/services/piscine/marques-filtres" as const;

export type PiscineFiltreSpec = { label: string; value: string };

export type PiscineFiltreProduct = {
  id: string;
  catalogId: string;
  name: string;
  series: string;
  summary: string;
  specs: PiscineFiltreSpec[];
  image: string;
  imageInstall: string;
  imageInstallAlt: string;
};

export type PiscineFiltreMarqueSection = {
  id: string;
  title: string;
  tagline: string;
  intro: string;
  brandLogo: string;
  accent: string;
  products: PiscineFiltreProduct[];
};

const FILTRES = "/img/piscine/filtres";
const PRODUCTS = `${FILTRES}/products`;
const INSTALL = `${FILTRES}/install`;
const LOGOS = `${FILTRES}/logos`;

export const piscineFiltreMarqueSections: PiscineFiltreMarqueSection[] = [
  {
    id: "astralpool",
    title: "Astralpool",
    tagline: "Aster · Filtre laminé polyester",
    intro:
      "Filtres à sable Astralpool série Aster — cuve laminée polyester/fibre de verre, vanne multivoie 6 positions, manomètre intégré. Référence mondiale pour la filtration piscine.",
    brandLogo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    products: [
      {
        id: "filtre-astralpool-aster-compact",
        catalogId: "filtre-astralpool-aster",
        name: "Astralpool Aster — Compact",
        series: "Ø450 – Ø600 · 5 – 14 m³/h",
        summary:
          "Filtre Aster compact — idéal piscines jusqu'à 50 m³, cuve laminée, vanne 6 voies, manomètre de pression.",
        image: `${PRODUCTS}/astralpool-aster-product.jpg`,
        imageInstall: `${INSTALL}/astralpool-install-villa.jpg`,
        imageInstallAlt: "Filtre Astralpool Aster compact — installation villa",
        specs: [
          { label: "Diamètre", value: "Ø450 – Ø600 mm" },
          { label: "Débit", value: "5 – 14 m³/h" },
          { label: "Cuve", value: "Laminé polyester" },
          { label: "Vanne", value: "6 positions" },
        ],
      },
      {
        id: "filtre-astralpool-aster-grande",
        catalogId: "filtre-astralpool-aster",
        name: "Astralpool Aster — Grande capacité",
        series: "Ø750 – Ø900 · 21 – 30 m³/h",
        summary:
          "Filtre Aster grande capacité — pour grands bassins et piscines à débordement, débit jusqu'à 30 m³/h.",
        image: `${PRODUCTS}/astralpool-aster-product.jpg`,
        imageInstall: `${INSTALL}/astralpool-install-villa.jpg`,
        imageInstallAlt: "Filtre Astralpool Aster grande capacité — local technique",
        specs: [
          { label: "Diamètre", value: "Ø750 – Ø900 mm" },
          { label: "Débit", value: "21 – 30 m³/h" },
          { label: "Cuve", value: "Laminé fibre de verre" },
          { label: "Pression max", value: "2,5 bar" },
        ],
      },
    ],
  },
  {
    id: "waterpool",
    title: "Waterpool",
    tagline: "Filtre à sable · Polyéthylène anti-UV",
    intro:
      "Filtres à sable Waterpool — cuve polyéthylène haute densité résistant aux UV, vanne multivoie 6 positions, manomètre intégré. Excellent rapport qualité-prix.",
    brandLogo: `${LOGOS}/logo-waterpool.svg`,
    accent: "#0077B6",
    products: [
      {
        id: "filtre-waterpool-standard",
        catalogId: "waterpool-filtre-sable",
        name: "Waterpool — Standard",
        series: "Ø400 – Ø500 · 20 – 50 m³",
        summary:
          "Filtre à sable Waterpool standard — vanne 6 voies, manomètre, pour piscines résidentielles de 20 à 50 m³.",
        image: `${PRODUCTS}/waterpool-filtre-product.jpg`,
        imageInstall: `${INSTALL}/waterpool-install-villa.jpg`,
        imageInstallAlt: "Filtre Waterpool standard — piscine villa Maroc",
        specs: [
          { label: "Diamètre", value: "Ø400 – Ø500 mm" },
          { label: "Volume bassin", value: "20 – 50 m³" },
          { label: "Cuve", value: "Polyéthylène anti-UV" },
          { label: "Vanne", value: "6 positions" },
        ],
      },
      {
        id: "filtre-waterpool-grande",
        catalogId: "waterpool-filtre-sable",
        name: "Waterpool — Grande capacité",
        series: "Ø600 – Ø700 · 50 – 80 m³",
        summary:
          "Filtre Waterpool grande capacité — filtration puissante pour grands bassins, manomètre et vanne multivoie inclus.",
        image: `${PRODUCTS}/waterpool-filtre-product.jpg`,
        imageInstall: `${INSTALL}/waterpool-install-villa.jpg`,
        imageInstallAlt: "Filtre Waterpool grande capacité — Essaouira",
        specs: [
          { label: "Diamètre", value: "Ø600 – Ø700 mm" },
          { label: "Volume bassin", value: "50 – 80 m³" },
          { label: "Média", value: "Sable ou verre" },
          { label: "Pression max", value: "2,5 bar" },
        ],
      },
    ],
  },
  {
    id: "aquarius",
    title: "Aquarius",
    tagline: "Side Mount · Polypropylène injecté",
    intro:
      "Filtres Aquarius — cuve injectée en polypropylène, vanne latérale 6 voies, connexions union. Conception italienne, débits 6 à 35 m³/h.",
    brandLogo: `${LOGOS}/logo-aquarius.svg`,
    accent: "#4A5568",
    products: [
      {
        id: "filtre-aquarius-compact",
        catalogId: "filtre-aquarius-side",
        name: "Aquarius — Compact",
        series: "6 – 14 m³/h",
        summary:
          "Filtre Aquarius compact — vanne latérale 6 voies, cuve polypropylène, idéal piscines jusqu'à 40 m³.",
        image: `${PRODUCTS}/aquarius-filtre-product.jpg`,
        imageInstall: `${INSTALL}/aquarius-install-villa.jpg`,
        imageInstallAlt: "Filtre Aquarius compact — installation villa",
        specs: [
          { label: "Débit", value: "6 – 14 m³/h" },
          { label: "Cuve", value: "Polypropylène injecté" },
          { label: "Vanne", value: "Latérale 6 voies" },
          { label: "Connexions", value: "Union 1½\"" },
        ],
      },
      {
        id: "filtre-aquarius-grande",
        catalogId: "filtre-aquarius-side",
        name: "Aquarius — Grande capacité",
        series: "22 – 35 m³/h",
        summary:
          "Filtre Aquarius grande capacité — haut débit pour grands bassins, vanne side mount, manomètre intégré.",
        image: `${PRODUCTS}/aquarius-filtre-product.jpg`,
        imageInstall: `${INSTALL}/aquarius-install-villa.jpg`,
        imageInstallAlt: "Filtre Aquarius grande capacité — filtration piscine",
        specs: [
          { label: "Débit", value: "22 – 35 m³/h" },
          { label: "Cuve", value: "Polypropylène injecté" },
          { label: "Vanne", value: "Latérale 6 voies" },
          { label: "Pression max", value: "2,5 bar" },
        ],
      },
    ],
  },
];
