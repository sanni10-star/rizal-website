/** Marques filtres à sable piscine — slider Astralpool, Waterpool & Aquarius. */
export type PiscineFiltreMarque = {
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

const FILTRES = "/img/piscine/filtres";
const INSTALL = `${FILTRES}/install`;
const LOGOS = `${FILTRES}/logos`;

export const piscineFiltreMarques: PiscineFiltreMarque[] = [
  {
    id: "astralpool",
    name: "Astralpool",
    series: "Aster",
    tagline: "Laminé polyester · Vanne 6 voies",
    description:
      "Filtres Astralpool Aster — cuve laminée polyester/fibre de verre, vanne multivoie 6 positions, manomètre intégré. De Ø350 à Ø900 mm, débit 5 à 30 m³/h pour villas et piscines résidentielles.",
    phaseLabel: "Vanne 6 voies",
    installImage: `${INSTALL}/astralpool-install-villa.jpg`,
    installImageAlt: "Filtre à sable Astralpool Aster installé — local technique piscine villa",
    logo: `${LOGOS}/logo-astralpool.svg`,
    accent: "#003DA5",
    accentLight: "#E8F0FA",
    bgGradient: "linear-gradient(145deg, #002855 0%, #00408a 45%, #001a3d 100%)",
  },
  {
    id: "waterpool",
    name: "Waterpool",
    series: "Filtre à Sable",
    tagline: "Polyéthylène anti-UV · Manomètre",
    description:
      "Filtres à sable Waterpool — cuve polyéthylène haute densité résistant aux UV, vanne 6 positions, manomètre de pression. Ø400 à Ø700 mm pour piscines de 20 à 80 m³.",
    phaseLabel: "Vanne 6 voies",
    installImage: `${INSTALL}/waterpool-install-villa.jpg`,
    installImageAlt: "Filtre à sable Waterpool installé — filtration piscine villa Essaouira",
    logo: `${LOGOS}/logo-waterpool.svg`,
    accent: "#0077B6",
    accentLight: "#E6F4FA",
    bgGradient: "linear-gradient(145deg, #003d5c 0%, #0077b6 45%, #002a40 100%)",
  },
  {
    id: "aquarius",
    name: "Aquarius",
    series: "Side Mount",
    tagline: "Polypropylène injecté · Italie",
    description:
      "Filtres Aquarius — cuve injectée en polypropylène, vanne latérale 6 voies, connexions union. Débits 6 à 35 m³/h, idéaux pour piscines résidentielles et semi-professionnelles.",
    phaseLabel: "Vanne latérale",
    installImage: `${INSTALL}/aquarius-install-villa.jpg`,
    installImageAlt: "Filtre à sable Aquarius installé au bord d'une piscine marocaine",
    logo: `${LOGOS}/logo-aquarius.svg`,
    accent: "#4A5568",
    accentLight: "#EDF2F7",
    bgGradient: "linear-gradient(145deg, #2d3748 0%, #4a5568 45%, #1a202c 100%)",
  },
];
