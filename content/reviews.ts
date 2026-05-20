export type Review = {
  id: string;
  authorName: string;
  authorCity?: string;
  rating: number;
  title: string;
  body: string;
  category: "climatisation" | "solaire" | "piscine" | "renovation";
  featured?: boolean;
};

export const reviews: Review[] = [
  {
    id: "r-1",
    authorName: "Karim B.",
    authorCity: "Essaouira - Diabat",
    rating: 5,
    title: "Climatisation LG sur 6 chambres, prestation premium",
    body: "Equipement de toute la villa avec des LG ARTCOOL Mirror et un VRF pour le double salon. L'equipe RIZAL a respecte les delais a la lettre, finitions impeccables. On ne sent ni le bruit ni les courants d'air.",
    category: "climatisation",
    featured: true,
  },
  {
    id: "r-2",
    authorName: "Salma R.",
    authorCity: "Essaouira - Ghazoua",
    rating: 5,
    title: "Kit solaire 15 kWc + batteries - autonomie totale",
    body: "Facture ONEE divisee par 5. Etude precise, materiel premium (Huawei + Pylontech), demarches ONEE entierement gerees par RIZAL. Equipe pro et accompagnement post-installation au top.",
    category: "solaire",
    featured: true,
  },
  {
    id: "r-3",
    authorName: "Mehdi A.",
    authorCity: "Essaouira - Mogador",
    rating: 5,
    title: "Piscine debordement - chantier livre dans les delais",
    body: "12x4m a debordement en pierre naturelle, local technique enterre, eclairage LED RGB, traitement au sel. Tout livre en 14 semaines comme promis. Resultat sublime.",
    category: "piscine",
    featured: true,
  },
  {
    id: "r-4",
    authorName: "Younes M.",
    authorCity: "Essaouira - Ounagha",
    rating: 5,
    title: "Renovation complete d'une villa de 380 m²",
    body: "Renovation totale en 5 mois (gros oeuvre, electricite, climatisation gainable, marbre, menuiserie alu). Suivi de chantier hebdomadaire et planning respecte. Je recommande sans hesiter.",
    category: "renovation",
  },
  {
    id: "r-5",
    authorName: "Hicham E.",
    authorCity: "Essaouira - Medina",
    rating: 5,
    title: "Multi-split TRANE installe en 2 jours",
    body: "Multi-split TRANE 1 vers 5, installation rapide et soignee, equipe respectueuse de la villa (films de protection partout). Tres pro.",
    category: "climatisation",
  },
  {
    id: "r-6",
    authorName: "Imane L.",
    authorCity: "Essaouira - Bab Doukkala",
    rating: 5,
    title: "Adoucisseur + osmose - eau enfin pure",
    body: "Installation rapide d'un adoucisseur 30L et osmose 6 etapes. Eau enfin agreable, plus de calcaire dans la cuisine. Tarif transparent.",
    category: "renovation",
  },
];
