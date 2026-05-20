import { SOLAIRE_MARQUES_THERMIQUE_PATH } from "@/content/solaire-marques-thermique";

/** Lien vers la page solaire thermique (LATO/Teliko, Sonne Aktion). Un ou deux visuels en fond. */
export type SolairePanneauRubriqueTile = {
  id: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  image: string;
  /** Texte alternatif du visuel principal (SEO / accessibilité). */
  imageAlt?: string;
  /** Second visuel (moitié droite), ex. autre marque thermique. */
  imageSecondary?: string;
  imageSecondaryAlt?: string;
  mode: "link";
  href: string;
};

const THERM = "/img/solaire/thermique";

export const solairePanneauxRubriqueTiles: SolairePanneauRubriqueTile[] = [
  {
    id: "marques-partagees",
    title: "Chauffe-eau solaire pour votre maison",
    subtitle: "LATO / Teliko · Sonne Aktion",
    eyebrow: "Gammes solaires thermiques",
    description:
      "Découvrez nos thermosiphons et capteurs plans pour produire votre eau chaude avec le soleil, dimensionnés selon votre toiture et votre consommation.",
    ctaLabel: "Découvrir la gamme",
    image: `${THERM}/lato-150-install.jpg`,
    imageAlt: "Thermosiphon LATO / Teliko TSR ECO en installation sur toiture",
    imageSecondary: `${THERM}/sonne-collector-install.jpg`,
    imageSecondaryAlt: "Chauffe-eau solaire Sonne Aktion — mise en situation",
    mode: "link",
    href: SOLAIRE_MARQUES_THERMIQUE_PATH,
  },
];
