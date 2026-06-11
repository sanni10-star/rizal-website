/** Marques pompes piscine — slider Astralpool, DAB, Waterpool Orion. */
export type PiscinePompeMarque = {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  phaseLabel: string;
  installImage: string;
  installImageAlt: string;
  logo: string;
  accent: string;
  accentLight: string;
  bgGradient: string;
};

const POMPES = "/img/piscine/pompes";
const INSTALL = `${POMPES}/install`;
const LOGOS = `${POMPES}/logos`;

export const piscinePompeMarques: PiscinePompeMarque[] = [
  {
    id: "astralpool",
    name: "Astralpool",
    series: "Victoria Plus",
    tagline: "Filtration silencieuse · Inox 316",
    description:
      "Pompes Astralpool Victoria Plus — auto-amorçantes, panier préfiltre 5 L, silencieuses (61–70 dBA). De 0,5 à 3 CV, mono et triphasé, idéales villas et piscines résidentielles au Maroc.",
    phaseLabel: "Mono & Triphasé",
    installImage: `${INSTALL}/astralpool-install-villa.jpg`,
    installImageAlt: "Pompe Astralpool Victoria Plus installée — local technique piscine villa",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    accentLight: "#E8F0FA",
    bgGradient: "linear-gradient(145deg, #002855 0%, #00408a 45%, #001a3d 100%)",
  },
  {
    id: "dab",
    name: "DAB",
    series: "Euroswim",
    tagline: "Haut rendement · Eau de mer",
    description:
      "Pompes DAB Euroswim — centrifuges auto-amorçantes, préfiltre grande capacité, compatibles chlore, sel et eau de mer. De 0,5 à 3 CV, mono 220 V et tri 380 V.",
    phaseLabel: "Mono & Triphasé",
    installImage: `${INSTALL}/dab-install-villa.jpg`,
    installImageAlt: "Pompe DAB Euroswim installée — filtration piscine villa Essaouira",
    logo: `${LOGOS}/logo-dab.svg`,
    accent: "#E30613",
    accentLight: "#FDE8EA",
    bgGradient: "linear-gradient(145deg, #5c0008 0%, #b30d18 45%, #3d0005 100%)",
  },
  {
    id: "waterpool",
    name: "Waterpool",
    series: "Orion",
    tagline: "Robuste · Qualité-prix",
    description:
      "Pompes Waterpool Orion — auto-amorçantes, moteur résiné, arbre inox AISI 316L, préfiltre transparent. De 3/4 à 3 CV en 220 V mono et 380 V tri.",
    phaseLabel: "Mono & Triphasé",
    installImage: `${INSTALL}/waterpool-install-villa.jpg`,
    installImageAlt: "Pompe Waterpool Orion installée au bord d'une piscine marocaine",
    logo: `${LOGOS}/logo-waterpool.svg`,
    accent: "#0077B6",
    accentLight: "#E6F4FA",
    bgGradient: "linear-gradient(145deg, #003d5c 0%, #0077b6 45%, #002a40 100%)",
  },
];
