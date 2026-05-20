export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  publishedAt: string;
  readingTime: string;
  body: string;
};

export const posts: BlogPost[] = [
  {
    slug: "climatisation-villa-maroc-guide-2026",
    title: "Climatisation de villa au Maroc : le guide complet 2026",
    excerpt:
      "Comment choisir entre MEGALIFE, INGELEC, LG et TRANE pour climatiser votre villa : puissance, technologie, budget, installation.",
    category: "Guide",
    cover: "/img/blog/climatisation-villa-maroc.jpg",
    publishedAt: "2026-04-15",
    readingTime: "9 min",
    body: `Climatiser une villa au Maroc demande une approche specifique : etes complets a 50 degres, hivers froids dans l'Atlas, isolation souvent moyenne, factures ONEE elevees. Ce guide vous donne les criteres exacts pour choisir le systeme adapte.

## 1. Calculer la puissance frigorifique (BTU)

Comptez 130 BTU par metre cube au Maroc (vs 100 en Europe). Ajoutez 600 BTU par occupant et un facteur 1,15 pour une exposition plein sud. Notre calculateur BTU vous donne le resultat en 30 secondes.

## 2. Choisir la marque

- **MEGALIFE** : meilleur rapport qualite/prix, ideal pour villas standards.
- **INGELEC** : conception adaptee au climat marocain, fiabilite eprouvee.
- **LG** : design premium, technologie Inverter de pointe, garantie 10 ans compresseur.
- **TRANE** : systemes VRF pour grandes villas (>300 m2), commercial-grade.

## 3. Installation : 3 erreurs a eviter

1. Sous-dimensionner pour economiser : la machine tourne en permanence, consomme et s'use.
2. Mettre l'unite exterieure plein sud sans abri : -15% de performance.
3. Negliger le tirage frigorifique : un bon installateur teste l'etancheite a l'azote.

## 4. Budget realiste

- Mural Inverter 12k BTU pose : a partir de 8 500 MAD.
- Cassette 24k BTU pose : a partir de 18 000 MAD.
- Multi-split 1 vers 5 villa : 60 000 a 110 000 MAD selon marque.

Pour une etude precise gratuite, contactez RIZAL via WhatsApp.`,
  },
  {
    slug: "kit-solaire-villa-rentabilite",
    title: "Kit solaire pour villa au Maroc : rentabilite et choix du dimensionnement",
    excerpt:
      "Combien de kWc, quelle batterie, quel onduleur, et en combien d'annees on rentabilise. Cas reels avec chiffres.",
    category: "Solaire",
    cover: "/img/blog/kit-solaire-villa.jpg",
    publishedAt: "2026-03-20",
    readingTime: "7 min",
    body: `Le Maroc beneficie d'un ensoleillement de classe mondiale (1500 a 1800 kWh/kWc/an). Combine a la hausse continue des tarifs ONEE, l'autoconsommation est devenue le projet le plus rentable d'une villa.

## Quel kit pour quelle facture ?

- Facture 1 500 MAD/mois : kit 5 kWc, 8 a 10 panneaux, sans batterie.
- Facture 3 000 MAD/mois : kit 10 kWc, hybride avec batterie 9,6 kWh.
- Facture 5 000+ MAD/mois (clim + piscine) : kit 15 kWc, batterie 14,4 kWh.

## Onduleur et batterie : ne jamais economiser

- Onduleur : Huawei SUN2000 ou Sungrow.
- Batterie : Pylontech Force ou Huawei LUNA, technologie LiFePO4 (10 ans+).

## ROI typique

5 a 7 ans pour un kit hybride bien dimensionne. Au-dela, electricite quasi-gratuite pendant 25 ans.

Ressource : utilisez notre calculateur kWc pour obtenir une estimation precise.`,
  },
  {
    slug: "renover-villa-maroc-checklist",
    title: "Renover une villa au Maroc : la checklist 47 points",
    excerpt:
      "Ce qu'il faut verifier avant, pendant et apres une renovation pour respecter delais et budget.",
    category: "Renovation",
    cover: "/img/blog/renovation-villa-maroc.jpg",
    publishedAt: "2026-02-10",
    readingTime: "11 min",
    body: `Une renovation de villa reussie repose sur 3 piliers : un cahier des charges precis, un planning contractuel et un suivi de chantier hebdomadaire.

## Avant le chantier (12 points cles)

- Releve dimensionnel precis
- Diagnostic structurel
- Etude electrique (norme NFC)
- Plomberie : reseau eau chaude / froide / EU / EV
- Climatisation : pre-cabling et alimentations
- Plan d'execution signe par les deux parties
- Echeancier de paiement
- Garantie decennale verifiee
- Assurance dommage-ouvrage
- Planning maitre detaille semaine par semaine
- Liste exhaustive des materiaux (refs / marques)
- Choix du chef de chantier dedie

## Pendant le chantier

Reunions hebdomadaires obligatoires, comptes rendus photos, alerte 48h en cas de derive planning.

Pour recevoir la checklist complete au format PDF, telechargez le guide RIZAL.`,
  },
];
