# RIZAL - Luxury Home & Hardware Solutions

> N1 au Maroc pour la climatisation premium, l'energie solaire, la renovation de villas, les piscines et le traitement d'eau.

Site web officiel **rizal.click** - Next.js 15 + TypeScript + Tailwind, panier "devis" persistant, cross-sell engine, checkout WhatsApp.

---

## Stack technique

| Couche | Choix |
|---|---|
| Framework | **Next.js 15** (App Router) + React 19 + TypeScript |
| UI | Tailwind CSS + Lucide icons |
| Hero carousel | Embla Carousel + Autoplay |
| State (cart) | Zustand + persist (localStorage) |
| Animations | Framer Motion |
| SEO | next-sitemap, JSON-LD (LocalBusiness, Product, BreadcrumbList) |
| i18n | FR primaire + AR micro-copy + EN toggle |

---

## AVANT LE PREMIER LANCEMENT

**Node.js n'est pas encore installe sur votre machine.** Voici les etapes :

### 1. Installer Node.js 20 LTS ou 22 LTS

- Telecharger : https://nodejs.org/fr (version LTS)
- Installer l'executable Windows .msi (cocher "Add to PATH")
- **Redemarrer votre terminal** (PowerShell / Cursor) pour que `npm` soit reconnu
- Verifier : `node --version` et `npm --version`

### 2. Installer les dependances

Ouvrez un terminal dans `C:\Users\PC\Documents\rizal\` puis :

```bash
npm install
```

(L'installation prend 1 a 3 minutes la premiere fois.)

### 3. Lancer le serveur de developpement

```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**.

### 4. Builder pour la production

```bash
npm run build
npm run start
```

---

## Configuration

Toute la configuration vit dans **`.env.local`** (deja cree, a completer) :

```env
NEXT_PUBLIC_SITE_URL=https://rizal.click
NEXT_PUBLIC_SITE_NAME=RIZAL
NEXT_PUBLIC_BRAND_TAGLINE=Luxury Home and Hardware Solutions
NEXT_PUBLIC_WHATSAPP_PHONE=212600000000
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
RESEND_API_KEY=
```

> Le numero WhatsApp doit etre au format international **sans le +** : `212600000000` (ex. : +212 6 12 34 56 78 -> 212612345678).

---

## Architecture

```
rizal/
+-- app/
|   +-- layout.tsx              Header + Footer + CartDrawer + WhatsApp flottant
|   +-- page.tsx                Landing (hero 3 sliders + 4 categories + brands)
|   +-- climatisation/
|   |   +-- page.tsx            Catalogue HVAC complet
|   |   +-- [brand]/page.tsx    MEGALIFE / INGELEC / LG / TRANE
|   |   +-- [brand]/[gamme]/    Fiche gamme detaillee
|   +-- energie-solaire/[gamme]/
|   +-- services/{piscine,renovation-villa,traitement-eau}/
|   +-- realisations/, a-propos/, contact/
|   +-- {mentions-legales,cgv,cgu,...}/   6 pages legales
|   +-- sitemap.ts, robots.ts
|   +-- globals.css
+-- components/
|   +-- layout/                 Header, Footer, MegaMenu, FloatingWhatsApp, CookieBanner
|   +-- hero/HeroCarousel.tsx   Embla, 3 sliders FR + AR
|   +-- catalog/                GammeCard, BrandCard, CrossSellRow, AddToCartButton, ServicePageShell
|   +-- cart/CartDrawer.tsx     Drawer Zustand + cross-sells
|   +-- ui/                     Container, SectionTitle, Button, Logo
|   +-- legal/LegalShell.tsx
|   +-- seo/JsonLd.tsx
+-- stores/cart.ts              Zustand panier persistant
+-- lib/                        site, whatsapp, crossSell, seo, utils, links
+-- content/
|   +-- catalog/                climatisation, solaire, services, accessoires
|   +-- heroSlides.ts
|   +-- realisations.ts
|   +-- legal.ts
+-- public/
|   +-- favicon.svg
|   +-- og/rizal-default.svg
+-- tailwind.config.ts, next.config.mjs, tsconfig.json
```

---

## Catalogue (verifie via Exa MCP)

### Climatisation - 4 marques officielles

- **MEGALIFE** (megalife.ma) - MJ-Smart Inverter R32, Versaty (Blanc/Noir/Miroir), ELVA DC Inverter, Cassette/Gainable Inverter R32, Multi-Split, Mobile (7 a 16k BTU)
- **INGELEC** (ingelec.ma) - Mural Inverter/On-Off, Cassette IGCLCI18I a 60I, Gainable IGCLGI12I a 60I
- **LG** (lg.com/ma) - ARTCOOL Mirror UVnano, ARTCOOL Gallery, DUALCOOL Premium, Multi-Split, MULTI V 5 (VRF)
- **TRANE** - Cassette 12 a 60k BTU, Multi-Split, Gainable, VRF (modeles 4TVC), Trane Rental MEA

### Energie Solaire

Panneaux Tier 1 (Jinko / LONGi / Canadian Solar), Onduleurs Huawei SUN2000, Batteries Pylontech US5000, Kits villa 5/10/15 kWc, Pompage solaire.

### Services

Piscines (skimmer, debordement, couloir de nage, lagon, spa), Renovation villa cle-en-main, Cuisine sur-mesure, Marbrerie & tadelakt, Domotique KNX/Loxone, Traitement d'eau (adoucisseurs, osmose, UV).

### Cross-sells

11 accessoires pre-ecrits : support mural inox, kit goulotte, contrat d'entretien, electrolyseur sel, PAC piscine, LED RGB, kit fixation toiture, etc.

---

## Funnel de conversion

| Etape | Comportement |
|---|---|
| 1. Catalogue | Aucun prix affiche, CTA "Ajouter au Devis" |
| 2. Ajout panier | Drawer Zustand s'ouvre, persistance localStorage |
| 3. Cross-sell | 4 produits suggeres dans le drawer + 3 en bas de page produit |
| 4. Checkout | Bouton "Finaliser sur WhatsApp" -> wa.me/... avec liste produits |
| 5. Conversion | Devis envoye en conversation WhatsApp humaine |

---

## Personnaliser

### Remplacer le numero WhatsApp

Modifier `NEXT_PUBLIC_WHATSAPP_PHONE` dans `.env.local` puis relancer `npm run dev`.

### Remplacer les photos / videos hero

1. Deposer vos fichiers dans `public/hero/` (ex. `hero-hvac.jpg`)
2. Modifier `content/heroSlides.ts` : `image: "/hero/hero-hvac.jpg"`

### Ajouter / modifier une gamme

Editer `content/catalog/climatisation.ts` (ou `solaire.ts`, `services.ts`, `accessoires.ts`). Le sitemap et toutes les pages se mettent a jour automatiquement.

### Logo officiel

Remplacer le composant `components/ui/Logo.tsx` par votre SVG, ou poser le fichier dans `public/` et l'importer.

---

## Deploiement Vercel

1. Pousser le code sur un repo GitHub (`git init`, `git add .`, `git commit`, `git push`).
2. Sur https://vercel.com -> "New Project" -> importer le repo.
3. Renseigner les variables d'environnement (`.env.local`).
4. Deployer.
5. Onglet Domains -> ajouter `rizal.click` et `www.rizal.click`.

### DNS chez votre registrar rizal.click

| Type  | Host | Valeur                  |
|-------|------|-------------------------|
| A     | @    | 76.76.21.21             |
| CNAME | www  | cname.vercel-dns.com    |

Vercel vous donnera les valeurs exactes lors de l'ajout du domaine.

---

## Conformite legale (Maroc)

- Loi 09-08 (CNDP) - Politique de confidentialite OK
- Loi 31-08 (consommateur) - CGV OK
- Loi 53-05 (echange electronique) - Mentions legales OK
- Garantie decennale - Page Garanties OK

A completer par votre avocat avant publication finale : RC, ICE, IF, capital, siege exact.

---

## Licence

(c) 2026 RIZAL SARL - Tous droits reserves.

Marques tierces (MEGALIFE, INGELEC, LG, TRANE, Huawei, Pylontech, Jinko, LONGi, Canadian Solar) propriete de leurs detenteurs respectifs.
