export const SOLAIRE_BATTERIES_PATH = "/energie-solaire/batteries";

export type SolaireBatterieRubriqueTile = {
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

const BAT = "/img/products/solaire/batteries";

export const solaireBatteriesRubriqueTiles: SolaireBatterieRubriqueTile[] = [
  {
    id: "rubrique-batteries",
    title: "Batteries LiFePO4 pour le stockage solaire",
    subtitle: "Dyness · MUST · Elitec-Lithium",
    eyebrow: "Gammes batteries",
    description:
      "Batteries lithium fer phosphate murales, rack et tour — 5 à 15 kWh, empilables, 6 000 à 8 000 cycles, garantie longue durée. Dyness DL5.0C, PowerBrick, MUST, Elitec EL10.",
    ctaLabel: "Découvrir les batteries",
    image: `${BAT}/dyness-powerbrick-installed.jpg`,
    imageAlt: "Batterie Dyness PowerBrick installée dans un riad marocain",
    imageSecondary: `${BAT}/dyness-dl5-rack-installed.jpg`,
    imageSecondaryAlt: "Batteries Dyness DL5.0C en rack — installation villa",
    mode: "link",
    href: SOLAIRE_BATTERIES_PATH,
  },
];
