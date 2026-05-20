export type LegalSection = { heading: string; body: string[] };
export type LegalPage = { title: string; updatedAt: string; intro?: string; sections: LegalSection[] };

const today = "2026-05-04";

export const mentionsLegales: LegalPage = {
  title: "Mentions Légales",
  updatedAt: today,
  intro:
    "Conformément à la loi marocaine n° 53-05 relative à l'échange électronique de données juridiques et à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, le présent site est édité par :",
  sections: [
    {
      heading: "Éditeur du site",
      body: [
        "Raison sociale : RIZAL SARL",
        "Forme juridique : Société à Responsabilité Limitée (SARL)",
        "Capital social : à compléter MAD",
        "Siège social : Essaouira, Maroc",
        "RC : à compléter — ICE : à compléter — IF : à compléter — CNSS : à compléter",
        "Téléphone : 06 30 73 03 50",
        "Email : entrepriserizal@gmail.com",
        "Directeur de la publication : à compléter",
      ],
    },
    {
      heading: "Hébergement",
      body: [
        "Le site rizal.click est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — vercel.com.",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      body: [
        "L'ensemble des contenus présents sur rizal.click (textes, images, logo RIZAL, structure, code source) sont la propriété exclusive de RIZAL SARL ou utilisés avec autorisation.",
        "Les marques tierces citées (MEGALIFE, INGELEC, LG, TRANE, Huawei, Pylontech, etc.) demeurent la propriété de leurs détenteurs respectifs et sont mentionnées en tant que produits distribués officiellement par RIZAL.",
      ],
    },
    {
      heading: "Crédit photographique",
      body: [
        "Photographies non contractuelles. Visuels d'illustration sous licence Unsplash / Pexels ou propriété de RIZAL SARL.",
      ],
    },
  ],
};

export const cgv: LegalPage = {
  title: "Conditions Générales de Vente",
  updatedAt: today,
  intro:
    "Les présentes Conditions Générales de Vente (CGV) régissent toute commande de produits ou services passée auprès de RIZAL SARL via le site rizal.click et ses canaux directs (WhatsApp, téléphone, email).",
  sections: [
    {
      heading: "1. Processus de commande",
      body: [
        "Le site rizal.click est un catalogue de présentation. Aucun prix n'est affiché, aucun paiement n'est encaissé directement sur le site.",
        "Le client manifeste son intérêt via le bouton « Ajouter au Devis » puis « Finaliser sur WhatsApp ». La conversation WhatsApp permet à RIZAL d'établir un devis personnalisé.",
        "La commande est ferme et définitive après signature du devis et versement de l'acompte contractuel (généralement 30 % à 50 % du montant total selon le projet).",
      ],
    },
    {
      heading: "2. Prix et paiement",
      body: [
        "Les prix sont communiqués via devis nominatif. Ils sont exprimés en MAD et incluent ou non la TVA selon le devis.",
        "Modalités de paiement acceptées : virement bancaire, chèque, espèces (dans la limite des montants autorisés par la loi marocaine), paiement à la livraison/installation pour le solde.",
      ],
    },
    {
      heading: "3. Livraison et installation",
      body: [
        "RIZAL livre et installe à Essaouira et dans la région.",
        "Les délais sont précisés dans le devis et constituent un engagement contractuel. RIZAL met en œuvre tous les moyens pour respecter les délais annoncés.",
      ],
    },
    {
      heading: "4. Garanties",
      body: [
        "Tous les produits bénéficient de la garantie constructeur d'origine (généralement 1 à 10 ans selon les marques et catégories).",
        "Les services de gros œuvre (rénovation villa, construction piscine) sont couverts par la garantie décennale conformément au Dahir des Obligations et Contrats marocain.",
        "Les finitions et second œuvre bénéficient d'une garantie biennale.",
      ],
    },
    {
      heading: "5. Droit de rétractation",
      body: [
        "Conformément à la loi 31-08 sur la protection du consommateur, le client dispose d'un droit de rétractation de 7 jours pour les produits standards non installés.",
        "Sont exclus de ce droit : les produits sur-mesure, les services déjà exécutés, les biens installés (climatisation posée, piscine entamée, rénovation démarrée).",
      ],
    },
    {
      heading: "6. Litiges",
      body: [
        "Les présentes CGV sont régies par le droit marocain. Tout litige relèvera des tribunaux compétents d'Essaouira, après tentative de résolution amiable.",
      ],
    },
  ],
};

export const cgu: LegalPage = {
  title: "Conditions Générales d'Utilisation",
  updatedAt: today,
  intro:
    "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'usage du site rizal.click.",
  sections: [
    {
      heading: "Acceptation",
      body: [
        "L'accès et l'utilisation du site rizal.click impliquent l'acceptation pleine et entière des présentes CGU.",
      ],
    },
    {
      heading: "Usage du site",
      body: [
        "Le site est un catalogue de présentation à finalité commerciale. L'utilisateur s'engage à un usage loyal du site et à ne pas tenter de porter atteinte à son intégrité, ses serveurs ou ses contenus.",
        "Le panier (« devis ») est stocké localement dans le navigateur de l'utilisateur (localStorage) et n'est transmis à RIZAL qu'au moment où l'utilisateur clique sur « Finaliser sur WhatsApp ».",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      body: [
        "Tous les éléments du site sont protégés par le droit d'auteur. Toute reproduction, représentation ou diffusion sans accord écrit préalable est interdite.",
      ],
    },
    {
      heading: "Liens externes",
      body: [
        "Le site peut contenir des liens vers des sites tiers (notamment WhatsApp, Google Maps, réseaux sociaux). RIZAL n'est pas responsable du contenu de ces sites.",
      ],
    },
    {
      heading: "Modification des CGU",
      body: [
        "RIZAL se réserve le droit de modifier les présentes CGU à tout moment. La version applicable est celle en vigueur au moment de l'utilisation du site.",
      ],
    },
  ],
};

export const confidentialite: LegalPage = {
  title: "Politique de Confidentialité",
  updatedAt: today,
  intro:
    "RIZAL SARL, conformément à la loi marocaine n° 09-08 (CNDP) et au Règlement Général sur la Protection des Données (RGPD) lorsqu'applicable, attache la plus grande importance à la protection de vos données personnelles.",
  sections: [
    {
      heading: "Données collectées",
      body: [
        "Via formulaire de contact : nom, prénom, email, téléphone, ville, message. Via WhatsApp : numéro de téléphone et contenu de la conversation. Via cookies analytiques (sous réserve de votre consentement) : données de navigation anonymisées.",
      ],
    },
    {
      heading: "Finalité du traitement",
      body: [
        "Réponse à vos demandes de devis et de renseignements. Suivi commercial et après-vente. Amélioration de la qualité de nos services. Envoi de communications commerciales (uniquement sur opt-in newsletter).",
      ],
    },
    {
      heading: "Durée de conservation",
      body: [
        "Données prospects : 3 ans après le dernier contact. Données clients : durée de la relation contractuelle + 10 ans (obligations comptables et de garantie décennale).",
      ],
    },
    {
      heading: "Vos droits (CNDP / RGPD)",
      body: [
        "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition au traitement de vos données personnelles.",
        "Pour exercer ces droits, contactez-nous à l'adresse : entrepriserizal@gmail.com. Vous pouvez également déposer une réclamation auprès de la CNDP (cndp.ma).",
      ],
    },
    {
      heading: "Sécurité",
      body: [
        "RIZAL met en œuvre les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.",
      ],
    },
  ],
};

export const cookies: LegalPage = {
  title: "Politique de Cookies",
  updatedAt: today,
  intro:
    "Le site rizal.click utilise des cookies pour assurer son fonctionnement et, sous réserve de votre consentement explicite, pour mesurer son audience et améliorer nos services.",
  sections: [
    {
      heading: "Cookies strictement nécessaires (sans consentement)",
      body: [
        "rizal-cart : stockage local du panier (devis en cours). Sans ce cookie, la fonctionnalité « ajout au devis » ne peut pas fonctionner.",
        "Préférence linguistique : mémorisation de votre choix de langue (FR / AR / EN).",
      ],
    },
    {
      heading: "Cookies analytiques (avec consentement)",
      body: [
        "Google Analytics 4 (GA4) : mesure d'audience anonymisée pour comprendre comment notre site est utilisé.",
        "Meta Pixel : mesure des performances de nos campagnes publicitaires Facebook et Instagram.",
        "Ces cookies ne sont activés qu'après votre consentement explicite via le bandeau d'information.",
      ],
    },
    {
      heading: "Gérer vos préférences",
      body: [
        "Vous pouvez à tout moment modifier vos préférences en cliquant sur le lien « Cookies » en pied de page, ou directement dans les paramètres de votre navigateur.",
      ],
    },
  ],
};

export const garanties: LegalPage = {
  title: "Garanties",
  updatedAt: today,
  intro:
    "RIZAL s'engage sur la durabilité de chaque produit et service proposé. Voici le détail des garanties applicables.",
  sections: [
    {
      heading: "Climatisation (MEGALIFE · INGELEC · LG · TRANE)",
      body: [
        "Garantie constructeur : 1 à 3 ans selon la marque et le modèle.",
        "LG DUAL Inverter Compressor : garantie compresseur étendue à 10 ans.",
        "TRANE : garantie 3 ans constructeur.",
        "Avec contrat d'entretien annuel RIZAL : prolongation de garantie + intervention prioritaire.",
      ],
    },
    {
      heading: "Énergie solaire",
      body: [
        "Panneaux Tier 1 : garantie produit 12 ans, garantie production linéaire 25 ans (≥ 87 % de production à 25 ans).",
        "Onduleurs Huawei SUN2000 : 10 ans (extensible).",
        "Batteries Pylontech LiFePO4 : 10 ans.",
        "Structure de fixation toiture : 20 ans.",
        "Installation RIZAL : 5 ans sur la pose.",
      ],
    },
    {
      heading: "Construction de piscines",
      body: [
        "Garantie décennale sur la structure (béton armé) — conforme au Dahir des Obligations et Contrats.",
        "Étanchéité (liner armé / polyester) : 10 ans constructeur.",
        "Équipements (filtration, électrolyse, PAC, LED) : 2 à 5 ans selon le matériel.",
      ],
    },
    {
      heading: "Rénovation de villa",
      body: [
        "Gros œuvre : garantie décennale.",
        "Second œuvre et finitions : garantie biennale.",
        "Équipements installés : garanties constructeur respectives.",
      ],
    },
    {
      heading: "Traitement d'eau",
      body: [
        "Adoucisseurs : 5 ans sur la cuve, 2 ans sur la vanne.",
        "Osmoseurs : 2 ans (hors consommables).",
        "Lampes UV : 2 ans (hors lampe à remplacer annuellement).",
      ],
    },
  ],
};
