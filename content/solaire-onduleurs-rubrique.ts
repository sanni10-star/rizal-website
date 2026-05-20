export const SOLAIRE_ONDULEURS_PATH = "/energie-solaire/onduleurs";

export type SolaireOnduleurRubriqueTile = {
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

const OND = "/img/products/solaire/onduleurs";

export const solaireOnduloursRubriqueTiles: SolaireOnduleurRubriqueTile[] = [
  {
    id: "rubrique-onduleurs",
    title: "Onduleurs hybrides pour votre installation solaire",
    subtitle: "SolaX · Solis · Deye",
    eyebrow: "Gammes onduleurs",
    description:
      "Onduleurs monophasés et triphasés hybrides — compatibles batteries lithium, monitoring par app, garantie constructeur. SolaX X1-LITE, X3-NEO, Solis, Deye.",
    ctaLabel: "Découvrir les onduleurs",
    image: `${OND}/solax-x1-lite-installed.jpg`,
    imageAlt: "Onduleur SolaX X1-LITE installé dans une villa marocaine",
    imageSecondary: `${OND}/deye-hybride-installed.jpg`,
    imageSecondaryAlt: "Onduleur Deye hybride installé — local technique villa",
    mode: "link",
    href: SOLAIRE_ONDULEURS_PATH,
  },
];
