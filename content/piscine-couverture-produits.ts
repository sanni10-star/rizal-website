/** Couverture thermique piscine — slider 5 bâches à bulles. */
export type PiscineCouvertureProduit = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  phaseLabel: string;
  productImage: string;
  productImageAlt: string;
  installImage: string;
  installImageAlt: string;
  logo: string;
  accent: string;
  accentLight: string;
  bgGradient: string;
};

const COUVERTURE = "/img/piscine/couverture";
const PRODUCTS = `${COUVERTURE}/products`;
const INSTALL = `${COUVERTURE}/install`;
const LOGOS = `${COUVERTURE}/logos`;

export const piscineCouvertureProduits: PiscineCouvertureProduit[] = [
  {
    id: "non-bordee",
    name: "Bâche à bulles",
    series: "400 µ — Brut de coupe",
    tagline: "Économique · Anti-UV · Sur mesure",
    description:
      "Bâche isotherme 400 microns non bordée — découpée aux dimensions exactes de votre bassin, sans œillets ni renforts. Idéale pour limiter l'évaporation et conserver la chaleur.",
    phaseLabel: "Brut de coupe",
    productImage: `${PRODUCTS}/non-bordee.jpg`,
    productImageAlt: "Bâche à bulles 400 microns non bordée — couverture thermique piscine",
    installImage: `${INSTALL}/non-bordee-install.jpg`,
    installImageAlt: "Bâche à bulles 400 microns non bordée — couverture thermique sur piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#1B6CA8",
    accentLight: "#E8F4FC",
    bgGradient: "linear-gradient(145deg, #0d3d5c 0%, #1b6ca8 45%, #0a2840 100%)",
  },
  {
    id: "bordee-2",
    name: "Bâche à bulles",
    series: "400 µ — Bordée 2 côtés",
    tagline: "Enrouleur · Œillets 50 cm · DUO",
    description:
      "Couverture 400 microns bordée sur 2 largeurs — renfort polyéthylène cousu, œillets tous les 50 cm côté enrouleur. Livrée avec bâchette de protection et sandows.",
    phaseLabel: "2 côtés",
    productImage: `${PRODUCTS}/bordee-2.jpg`,
    productImageAlt: "Bâche à bulles 400 microns bordée 2 côtés — Astralpool Fluidra",
    installImage: `${INSTALL}/bordee-2-install.jpg`,
    installImageAlt: "Bâche à bulles bordée 2 côtés — couverture thermique piscine villa",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#0077B6",
    accentLight: "#E0F4FF",
    bgGradient: "linear-gradient(145deg, #004a6e 0%, #0077b6 45%, #003350 100%)",
  },
  {
    id: "bordee-4",
    name: "Bâche à bulles",
    series: "400 µ — Bordée 4 côtés QUATRO",
    tagline: "Périmètre renforcé · Durabilité max",
    description:
      "Bâche QUATRO bordée sur tout le périmètre — renfort cousu sur 4 côtés, œillets aux angles et côté enrouleur. Gain de température +3 à +7 °C, évaporation réduite ~90 %.",
    phaseLabel: "4 côtés",
    productImage: `${PRODUCTS}/bordee-4.jpg`,
    productImageAlt: "Bâche à bulles 400 microns bordée 4 côtés QUATRO — couverture thermique",
    installImage: `${INSTALL}/bordee-4-install.jpg`,
    installImageAlt: "Bâche QUATRO bordée 4 côtés — couverture thermique piscine",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    accentLight: "#E6EEF9",
    bgGradient: "linear-gradient(145deg, #001f5c 0%, #003da5 45%, #001233 100%)",
  },
  {
    id: "geobubble-400",
    name: "GeoBubble",
    series: "400 µ — Bulles brevetées",
    tagline: "Durée de vie +25 % · Anti-UV",
    description:
      "Couverture GeoBubble 400 microns — bulles en forme de huit brevetées, 50 % plus épaisses aux points fins. Résistance accrue aux UV et aux produits chimiques.",
    phaseLabel: "GeoBubble",
    productImage: `${PRODUCTS}/geobubble-400.jpg`,
    productImageAlt: "GeoBubble 400 microns — couverture thermique piscine sur mesure",
    installImage: `${INSTALL}/geobubble-400-install.jpg`,
    installImageAlt: "GeoBubble 400 microns — couverture thermique installée sur bassin",
    logo: `${LOGOS}/logo-geobubble.svg`,
    accent: "#2D6A4F",
    accentLight: "#E8F5EE",
    bgGradient: "linear-gradient(145deg, #1b4332 0%, #2d6a4f 45%, #0f2920 100%)",
  },
  {
    id: "geobubble-500",
    name: "GeoBubble",
    series: "500 µ — Premium",
    tagline: "Haute résistance · Bassins intensifs",
    description:
      "GeoBubble 500 microns — épaisseur premium pour piscines à fort usage ou chauffées par PAC. Même technologie brevetée, durabilité et isolation thermique renforcées.",
    phaseLabel: "500 µ",
    productImage: `${PRODUCTS}/geobubble-500.jpg`,
    productImageAlt: "GeoBubble 500 microns — couverture thermique premium piscine",
    installImage: `${INSTALL}/geobubble-500-install.jpg`,
    installImageAlt: "GeoBubble 500 microns premium — couverture thermique piscine",
    logo: `${LOGOS}/logo-geobubble.svg`,
    accent: "#1D3557",
    accentLight: "#E8EEF5",
    bgGradient: "linear-gradient(145deg, #0d1b2a 0%, #1d3557 45%, #061018 100%)",
  },
];
