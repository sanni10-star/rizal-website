export const PISCINE_ASTRALPOOL_PATH = "/services/piscine/astralpool";
export const PISCINE_WATERPOOL_PATH = "/services/piscine/waterpool";

export type PiscinePompeRubriqueTile = {
  id: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  image: string;
  imageAlt?: string;
  imageSecondary?: string;
  imageSecondaryAlt?: string;
  mode: "link";
  href: string;
};

const ASTRAL = "/img/products/piscine/pompes/astralpool";
const WATER = "/img/products/piscine/pompes/waterpool";

export const piscinePompesRubriqueTiles: PiscinePompeRubriqueTile[] = [
  {
    id: "rubrique-astralpool",
    title: "Pompes piscine Astralpool",
    subtitle: "Astralpool · Victoria Plus · Sena",
    eyebrow: "Gammes pompes Astralpool",
    description:
      "Pompes auto-amorçantes haute performance pour piscines résidentielles — Victoria Plus et Sena. Silencieuses, économiques, fiables. De 0.5 à 3 CV.",
    ctaLabel: "Découvrir Astralpool",
    image: `${ASTRAL}/victoria-plus-installed.jpg`,
    imageAlt: "Pompe Astralpool Victoria Plus installée dans un local technique piscine",
    imageSecondary: `${ASTRAL}/sena-installed.jpg`,
    imageSecondaryAlt: "Pompe Astralpool Sena compacte installée au bord d'une piscine",
    mode: "link",
    href: PISCINE_ASTRALPOOL_PATH,
  },
  {
    id: "rubrique-waterpool",
    title: "Pompes piscine Waterpool",
    subtitle: "Waterpool · Orion",
    eyebrow: "Gammes pompes Waterpool",
    description:
      "Pompes auto-amorçantes robustes pour piscines — gamme Orion de 0.5 à 3 CV, monophasé et triphasé. Rapport qualité-prix excellent.",
    ctaLabel: "Découvrir Waterpool",
    image: `${WATER}/orion-installed.jpg`,
    imageAlt: "Pompe Waterpool Orion installée au bord d'une piscine marocaine",
    mode: "link",
    href: PISCINE_WATERPOOL_PATH,
  },
];
