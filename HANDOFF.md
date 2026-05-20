# RIZAL — Handoff brief for the next AI coder

> Copy-paste everything below to your AI coder (Cursor / Claude Code / Codex / Aider). It contains all the context, links to docs, current state, and prioritized work queue.

## STRUCTURE DE LIVRAISON ATTENDUE (à respecter par le prochain AI coder)

Le projet doit être livré en **deux dossiers séparés** + 1 fichier d'intégration Google Sheets :

```
/frontend/                ← Next.js 15 App Router (pages, components, hooks, public assets)
                            Sert UNIQUEMENT le HTML + JS + CSS au navigateur.
                            Aucune logique business, aucune connexion DB directe.
                            Variables NEXT_PUBLIC_* uniquement.
                            Déployé en standalone Docker.

/backend/                 ← API + Prisma + intégrations (CAPI, Sheets, Resend, WhatsApp Cloud)
                            Toutes les routes /api/* du Next.js actuel migrent ici (Fastify ou
                            NestJS recommandés). Ou : si tu gardes Next.js full-stack,
                            sépare clairement /backend/api/* de /frontend/app/* dans le repo.
                            Variables SECRÈTES (DATABASE_URL, RESEND_API_KEY, etc.).

/tools/sheets/rizal-sheet-webhook.gs    ← Google Apps Script à coller dans Sheets
                                          (instructions complètes en haut du fichier).
                                          Le backend POST automatiquement chaque
                                          lead/devis/abonné/RDV vers ce webhook.
```

**Note pour la version actuelle :** le code est encore monolithique (Next.js full-stack avec API routes au même endroit que le frontend). La séparation en deux dossiers est l'**objectif d'architecture** que tu dois exécuter en P0 du backlog ci-dessous, en mettant tout l'API + Prisma sous `/backend/` et en transformant le frontend en consommateur HTTP pur. Cela permet :

- Déploiements indépendants (frontend sur Vercel/Cloudflare, backend dans Docker près de Postgres)
- Scaling indépendant
- Ajout futur d'une app mobile / partenaires B2B sans toucher au frontend

---

---

## 0. SYSTEM PROMPT (paste this first)

You are the lead full-stack engineer on **RIZAL** — a high-end DTC e-commerce / lead-generation site for the Moroccan luxury home & hardware market (climatisation MEGALIFE / INGELEC / LG / TRANE, énergie solaire, piscines, rénovation de villas, traitement d'eau).

**The site is live, builds cleanly, and ships every page.** Your job is to **harden, optimize, and complete** what's already there. Do NOT rewrite from scratch. Read the existing code first, follow the established patterns, and respect the brand.

### Hard rules

1. **No prices, no on-site checkout.** Every "checkout" must redirect to WhatsApp with a pre-filled message. The cart is a "devis" (quote) builder.
2. **French is primary.** Arabic micro-copy is allowed for high-impact phrases (badges, hero accents). English is a future toggle (do NOT add it yet unless asked).
3. **Brand:** orange `#F47B20` + navy `#1A2845` (from the official logo at `/img/brand/rizal-logo.png`) + sand `#C9A96E` accent. Display font: Cormorant Garamond. Sans: Inter. Arabic: Cairo.
4. **Frontend = Next.js 15 App Router + React 19 + Tailwind + Zustand + Embla.** Backend = **Postgres via Prisma**. No Redux, no tRPC, no GraphQL. No Shopify, no third-party paid SaaS.
5. **All forms persist to Postgres via API routes** (`/api/contact`, `/api/quote`, `/api/newsletter`, `/api/lead-magnet`, `/api/calculator`, `/api/appointment`).
6. **Lead-first.** Every interaction must capture intent (form, calculator, WhatsApp click, exit-intent, etc.) and store it in the `Lead` table with a computed `score` (0-100), `source`, and full UTM attribution.
7. **Performance budget:** LCP < 2.0s on 4G mobile, CLS < 0.05, TBT < 200ms, hydration < 150ms on the home page.
8. **Accessibility:** WCAG 2.1 AA. Keyboard-navigable, focus-visible, color contrast >= 4.5:1.
9. **Moroccan legal:** comply with Loi 09-08 (CNDP — données personnelles), 31-08 (consommateur), 53-05 (échange électronique), garantie décennale (gros œuvre).
10. **Always write production-grade code.** Type everything (TypeScript strict). No `any` unless commented. No console.log in production paths. Validate every API input with Zod. Handle errors gracefully.
11. **Catalog strictness:** every HVAC product must clearly expose `Marque`, `Catégorie = Climatisation`, `Type de climatisation` (`Encastrable`, `Multi-split`, `Mobile`, `Mural`, `Cassette`, `Gainable`, `VRF`) and `Produit conseillé pour`. The site currently injects these specs automatically in `content/catalog/index.ts`; keep that invariant.
12. **Images:** never use random stock images as product photos. If the exact product photo is not available, keep `image: ""`; the UI will show a premium RIZAL fallback block (“Photo produit à ajouter”). The owner will add real images later.
13. **Solar brand limit:** do not add more than 4 solar brands. Current allowed solar brands are **Jinko**, **LONGi**, **Huawei**, **Pylontech**. Do not reintroduce Canadian Solar, Sungrow, Growatt, Lorentz, Grundfos, etc. unless the owner explicitly approves.

---

## 1. PROJECT CONTEXT

| Item | Value |
|---|---|
| Brand | **RIZAL** |
| Tagline | Luxury Home & Hardware Solutions |
| Domain | https://rizal.click |
| Logo | `/public/img/brand/rizal-logo.png` (orange cursive "Rizal" + 5 service icons) |
| Market | Morocco (Casablanca, Rabat, Marrakech, Tanger, Agadir + national) |
| Business model | High-ticket branded catalog, no displayed prices, lead-gen via WhatsApp |
| WhatsApp number env | `NEXT_PUBLIC_WHATSAPP_PHONE` (currently placeholder `212600000000`) |
| Database | Postgres in Docker, internal hostname `rizal_database` |
| Connection string | `postgres://rizal:rizal@rizal_database:5432/rizal?sslmode=disable` |

---

## 2. CURRENT STACK & DEPENDENCIES

```
next            ^15.1.6      App Router, RSC, standalone output
react           ^19.0.0
typescript      ^5.7.2
tailwindcss     ^3.4.16      + custom palette (ink/brand/sand/bone/wa)
zustand         ^5.0.2       client cart/quote store + localStorage persist
embla-carousel-react + autoplay  hero slider
framer-motion   ^11.13       micro-animations
lucide-react    ^0.468       icons
@prisma/client  ^6.1         ORM
prisma          ^6.1         CLI / migrations
zod             ^3.24        runtime validation for all API routes
resend          ^4.0         transactional email (sales notifications, lead magnets)
bcryptjs        ^2.4         admin password hashing (when AdminUser is enabled)
next-sitemap    ^4.2         postbuild sitemap
```

### Official docs (read these before touching anything)

- Next.js App Router — https://nextjs.org/docs/app
- Next.js metadata & SEO — https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js standalone output — https://nextjs.org/docs/app/api-reference/next-config-js/output
- React 19 — https://react.dev/blog/2024/12/05/react-19
- Prisma quickstart — https://www.prisma.io/docs/getting-started
- Prisma with Next.js — https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
- Prisma migrate — https://www.prisma.io/docs/orm/prisma-migrate
- Tailwind v3 — https://tailwindcss.com/docs
- Tailwind config customization — https://tailwindcss.com/docs/configuration
- Zustand — https://zustand.docs.pmnd.rs/
- Zustand persist middleware — https://zustand.docs.pmnd.rs/integrations/persisting-store-data
- Embla Carousel — https://www.embla-carousel.com/
- Framer Motion — https://www.framer.com/motion/
- Lucide icons — https://lucide.dev/
- Zod — https://zod.dev/
- Resend (email) — https://resend.com/docs/introduction
- Resend Next.js guide — https://resend.com/docs/send-with-nextjs
- WhatsApp click-to-chat — https://faq.whatsapp.com/5913398998672934
- WhatsApp Business API (future) — https://developers.facebook.com/docs/whatsapp/cloud-api
- next/image — https://nextjs.org/docs/app/api-reference/components/image
- next/font — https://nextjs.org/docs/app/api-reference/components/font
- Schema.org Product — https://schema.org/Product
- Schema.org LocalBusiness — https://schema.org/LocalBusiness
- Schema.org FAQPage — https://schema.org/FAQPage
- Schema.org Review — https://schema.org/Review
- Loi 09-08 CNDP Maroc — https://www.cndp.ma/

---

## 3. REPOSITORY MAP (what's already built)

```
rizal/
├── app/
│   ├── layout.tsx              ← root: Header, Footer, FloatingWhatsApp, Cart, ExitIntent, SocialProofLive, Sticky mobile CTA, Analytics
│   ├── page.tsx                ← home: HeroCarousel + TrustRibbon + categories + brands + featured + pillars + realisations + BrandComparator + ReviewsBlock + Faq + CTA
│   ├── climatisation/
│   │   ├── page.tsx
│   │   ├── [brand]/page.tsx
│   │   └── [brand]/[gamme]/page.tsx
│   ├── energie-solaire/
│   │   ├── page.tsx
│   │   └── [gamme]/page.tsx
│   ├── services/
│   │   ├── piscine/page.tsx
│   │   ├── renovation-villa/page.tsx
│   │   └── traitement-eau/page.tsx
│   ├── outils/page.tsx         ← BTU + kWc calculators (lead magnets)
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contact/page.tsx        ← persists to /api/contact
│   ├── realisations/page.tsx
│   ├── a-propos/page.tsx
│   ├── garanties/page.tsx
│   ├── mentions-legales/page.tsx
│   ├── cgv/page.tsx
│   ├── cgu/page.tsx
│   ├── politique-confidentialite/page.tsx
│   ├── politique-cookies/page.tsx
│   ├── admin/                  ← protected by middleware.ts (cookie 'rizal_admin')
│   │   ├── login/page.tsx
│   │   ├── leads/page.tsx
│   │   ├── quotes/page.tsx
│   │   └── subscribers/page.tsx
│   └── api/
│       ├── contact/route.ts
│       ├── newsletter/route.ts
│       ├── quote/route.ts
│       ├── lead-magnet/route.ts
│       ├── calculator/route.ts
│       ├── social-proof/route.ts (GET)
│       ├── appointment/route.ts
│       └── admin/{login,logout}/route.ts
├── components/
│   ├── analytics/Analytics.tsx (GA4 + Meta Pixel)
│   ├── catalog/{BrandCard, GammeCard, ServicePageShell, BrandComparator, ReviewsBlock, Faq, AddToCartButton}.tsx
│   ├── cart/CartDrawer.tsx     ← persists quote to /api/quote on WhatsApp click via sendBeacon
│   ├── contact/ContactForm.tsx
│   ├── cro/{StickyMobileCTA, ExitIntent, TrustRibbon, SocialProofLive, BtuCalculator, SolarCalculator}.tsx
│   ├── hero/HeroCarousel.tsx
│   ├── layout/{Header, Footer, MegaMenu, FloatingWhatsApp, CookieBanner, NewsletterForm}.tsx
│   ├── seo/JsonLd.tsx
│   ├── ui/{Container, SectionTitle, Logo}.tsx
│   └── admin/AdminShell.tsx
├── content/
│   ├── catalog/{climatisation, solaire, services, accessoires, index}.ts  ← 60+ items with full specs
│   ├── heroSlides.ts
│   ├── realisations.ts
│   ├── blog.ts                 ← 3 sample posts (FR), markdown body
│   ├── faq.ts                  ← faqGeneral, faqClimatisation, faqSolaire
│   ├── reviews.ts              ← 6 testimonials
│   └── legal.ts                ← legal entity data (RC/ICE/IF placeholders to fill)
├── lib/
│   ├── db.ts                   ← Prisma singleton
│   ├── leads.ts                ← createLead() + lead scoring + Resend notification
│   ├── validation.ts           ← Zod schemas for every API input
│   ├── site.ts                 ← SITE config object
│   ├── seo.ts                  ← buildMetadata() + JSON-LD helpers
│   ├── whatsapp.ts             ← whatsappCheckoutUrl, whatsappContactUrl
│   ├── crossSell.ts            ← getCrossSells, getRelatedToItem
│   ├── links.ts                ← gammeHref(item)
│   └── utils.ts                ← cn() helper
├── stores/cart.ts              ← Zustand persisted store
├── types/catalog.ts
├── prisma/schema.prisma        ← Lead, Quote, QuoteLine, Subscriber, Review, BlogPost, AdminUser, Appointment, SocialProof, LeadEvent
├── public/
│   ├── img/brand/rizal-logo.png
│   ├── favicon.svg, og-image.svg
│   ├── lead-magnets/    ← PUT THE PDFs HERE (rizal-guide-climatisation-villa-2026.pdf, etc.)
│   └── ...
├── middleware.ts                ← protects /admin/*
├── Dockerfile                   ← multi-stage, standalone, prisma client + migrations
├── docker-compose.yml           ← rizal_app + rizal_database (Postgres 16)
├── next.config.mjs              ← output: standalone, image remote patterns
├── tailwind.config.ts           ← brand palette (ink #1A2845, brand #F47B20, sand #C9A96E)
├── next-sitemap.config.js
├── .env.local / .env.example
└── package.json
```

### What works today (verified)

- `npm install` — OK (430+ packages)
- `npx prisma generate` — OK
- `npm run build` — OK (60+ pages prerendered, sitemap generated, ~24s compile)
- HTTP smoke tests on `/`, `/outils`, `/blog`, `/blog/<slug>`, `/contact`, `/admin/login`, `/api/social-proof`, `/climatisation/lg/lg-artcool-mirror` → all return **200**
- **MEGALIFE Encastrable** : 5 gammes officielles avec 22 SKUs (Gainable Inverter R410A, Gainable R410A, Gainable Inverter R32, Cassette Inverter, Cassette R410A)
- **Pixels GA4 + Meta** : chargés en `lazyOnload` après première interaction utilisateur (scroll/mousemove/touch/click) ou fallback 3s
- **Conversions API serveur** (`lib/conversions.ts`) : Meta CAPI + GA4 Measurement Protocol avec dédup `event_id` partagé client/serveur
- **Google Sheets** : chaque lead/devis/abonné/RDV poussé automatiquement vers le webhook Apps Script si `SHEETS_WEBHOOK_URL` configuré

### What's mocked / missing

- Real WhatsApp number (placeholder `212600000000`)
- Real product photos (currently Unsplash placeholders)
- Real customer review photos / video testimonials
- Lead magnet PDFs (the API route returns a path, but the PDF files don't exist yet → put them in `/public/lead-magnets/`)
- Real Google Analytics 4 ID and Meta Pixel ID
- Resend API key (sales notifications fail silently if missing — by design)
- Real legal entity values in `content/legal.ts` (RC, ICE, IF, capital social)
- Postgres migration not yet run against the production DB (run `prisma migrate deploy` on first deploy)
- Admin auth uses a single shared password from env (good enough for v1; switch to AdminUser table + bcrypt for v2)

---

## 4. ENVIRONMENT VARIABLES (`.env.local`)

```env
# === FRONTEND public ===
NEXT_PUBLIC_SITE_URL=https://rizal.click
NEXT_PUBLIC_SITE_NAME=RIZAL
NEXT_PUBLIC_BRAND_TAGLINE=Luxury Home and Hardware Solutions
NEXT_PUBLIC_WHATSAPP_PHONE=212600000000

# Pixels (chargés en lazyOnload après 1ère interaction)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# === BACKEND secrets ===
# Server-side conversions (deduplication via event_id)
META_CAPI_ACCESS_TOKEN=
META_CAPI_TEST_EVENT_CODE=
GA4_API_SECRET=

# Email transactional (Resend)
RESEND_API_KEY=
SALES_NOTIFY_EMAIL=contact@rizal.click

# Postgres
DATABASE_URL=postgres://rizal:rizal@rizal_database:5432/rizal?sslmode=disable
# Local dev hors Docker:
# DATABASE_URL=postgres://rizal:rizal@localhost:5432/rizal?sslmode=disable

# Google Sheets webhook (Apps Script Web App URL)
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
SHEETS_WEBHOOK_SECRET=un-secret-long-aleatoire

# Admin auth (CHANGE before prod)
NEXTAUTH_URL=https://rizal.click
NEXTAUTH_SECRET=please-generate-32-char-random-secret
ADMIN_BOOTSTRAP_EMAIL=admin@rizal.click
ADMIN_BOOTSTRAP_PASSWORD=change-me-immediately
```

### Comment configurer Google Sheets

1. Crée un Google Sheet vierge (par ex. "RIZAL — Leads & Devis")
2. Crée 4 onglets : `Leads`, `Quotes`, `Newsletter`, `Appointments` (orthographe exacte)
3. Extensions > Apps Script
4. Colle l'intégralité de `tools/sheets/rizal-sheet-webhook.gs`
5. (Recommandé) Modifie la constante `SHARED_SECRET` en haut avec un UUID
6. Déployer > Nouveau déploiement > Application Web
   - Exécuter en tant que : Moi
   - Accès : Toute personne (même anonyme)
7. Copie l'URL `/exec` qui s'affiche
8. Mets-la dans `SHEETS_WEBHOOK_URL` du backend, et le même secret dans `SHEETS_WEBHOOK_SECRET`
9. Redémarre le backend → tous les nouveaux leads/devis/abonnés/RDV apparaissent en temps réel dans le Sheet

### Comment configurer Meta Conversions API (CAPI)

1. Va dans Business Manager > Events Manager > ton Pixel
2. Onglet "Settings" > "Conversions API" > "Generate access token"
3. Copie le token dans `META_CAPI_ACCESS_TOKEN`
4. Pour tester sans polluer les vraies données : crée un Test Event Code dans "Test Events" et mets-le dans `META_CAPI_TEST_EVENT_CODE`
5. Le `event_id` de chaque conversion est généré par `lib/conversions.ts` et envoyé identiquement côté client (fbq) et serveur (CAPI) → Meta dédoublonne automatiquement.

### Comment configurer GA4 Measurement Protocol

1. Admin GA4 > Data Streams > ton stream Web > "Measurement Protocol API secrets"
2. Crée un secret, copie-le dans `GA4_API_SECRET`
3. Le `client_id` est généré côté serveur si manquant, idéalement remonte le `_ga` cookie du client pour une dédup parfaite (TODO du backlog).

---

## 5. DEPLOYMENT (Docker / Coolify / Dokploy)

The site is deployed via Docker. The Postgres container hostname is `rizal_database` on the same Docker network as `rizal_app`.

```bash
# Build + run via docker-compose
docker compose up -d --build

# Run Prisma migration on the running app container (first deploy only)
docker compose exec rizal_app npx prisma migrate deploy

# View logs
docker compose logs -f rizal_app
```

The Dockerfile uses Next.js standalone output so the final image is small (~150 MB).

---

## 6. WORK QUEUE (do these in order)

### P0 — Must ship before launch

0. **(Architecture) Split into `/frontend` and `/backend` folders.** Currently the repo is monolithic Next.js. Move :
   - All `app/api/*` routes + `lib/db.ts`, `lib/leads.ts`, `lib/conversions.ts`, `lib/sheets.ts`, `lib/validation.ts`, `prisma/` → into `/backend/` (recommended: Fastify or Next.js standalone API-only).
   - All `app/(public)/*` routes + `components/`, `stores/`, `content/`, `public/` → into `/frontend/`.
   - Frontend calls backend via `NEXT_PUBLIC_BACKEND_URL` env. CORS allowlist on backend = the frontend domain.
   - Two `Dockerfile`s, two services in `docker-compose.yml`.
   - Acceptance criteria: both folders build independently, full E2E flow (form → DB → sheet → CAPI) still works.

1. **Run the Prisma migration** on the production DB:
   ```bash
   docker compose exec rizal_app npx prisma migrate deploy
   ```
   If migrations aren't initialized yet, run `npx prisma migrate dev --name init` once locally first to generate the `prisma/migrations/` folder, then commit and deploy.

2. **Replace the WhatsApp number** in `.env.local` and on the deployed instance. The number is read from `NEXT_PUBLIC_WHATSAPP_PHONE` and used by `lib/whatsapp.ts`.

3. **Fill the legal entity data** in `content/legal.ts` (RC, ICE, IF, capital social, siège social). These are required by Loi 31-08 and Loi 53-05 for any Moroccan e-commerce site.

4. **Add Google Analytics 4 ID and Meta Pixel ID** to `.env`. The Analytics component (`components/analytics/Analytics.tsx`) auto-loads them when present.

5. **Add real product photos** to `/public/img/products/` and update `image` paths in `content/catalog/*.ts`. Sizes: 1200×900 minimum, WebP preferred.
   - **MEGALIFE Encastrable** : utilise les photos fournies par le brand pour les **Gainable** (les améliorer/refiner via AI pour matcher l'aesthetic high-end RIZAL). Les placeholders branded actuels sont des SVG dans `/public/img/products/megalife/` — remplace simplement le `.svg` par le `.jpg` (et mets à jour les chemins dans `content/catalog/climatisation.ts` : 5 items → `gainable-inverter-r410a`, `gainable-r410a`, `gainable-inverter-r32`, `cassette-inverter`, `cassette-r410a`).
   - **MEGALIFE Cassette** : photos fournies plus tard par le brand — garde les placeholders SVG pour l'instant.
   - Pour les **autres marques** (INGELEC, LG, TRANE) : recherche sur les sites officiels + catalogues PDF, et applique le même nommage `/public/img/products/<brand>/<gamme>.jpg`.
   - Si tu n'as pas la photo exacte du climatiseur/panneau/onduleur/batterie, laisse `image: ""`. Le composant `ProductImage` affiche un fallback premium et évite les images trompeuses.

6. **Catalog QA before launch** :
   - HVAC must be limited to 4 brands: `MEGALIFE`, `INGELEC`, `LG`, `TRANE`.
   - Each HVAC product must show the correct `formats` array (`Encastrable`, `Cassette`, `Gainable`, `Multi-split`, `Mobile`, `Mural`, `VRF`) so filters and product pages are accurate.
   - Solar must be limited to 4 brands: `Jinko`, `LONGi`, `Huawei`, `Pylontech`.
   - Check `npm run build`, then inspect `public/sitemap-0.xml` to verify all gamme URLs are generated.

7. **Add the lead magnet PDFs** to `/public/lead-magnets/`:
   - `rizal-guide-climatisation-villa-2026.pdf`
   - `rizal-guide-solaire-villa-2026.pdf`
   - `rizal-checklist-renovation-villa.pdf`
   - `rizal-guide-piscine-villa.pdf`

8. **Set Resend API key** so sales-team email notifications fire on every new lead. Without it, leads are still saved to Postgres but no email goes out.

### P1 — High-impact CRO additions

8. **WhatsApp Business Cloud API integration** — currently we open a `wa.me/...` link with pre-filled text. Upgrade to the official Cloud API so:
   - The `Lead` row gets the `whatsappMessageId` back
   - We can send templated follow-ups (24h, 72h, 7-day re-engagement)
   - We can track delivery / read receipts
   Doc: https://developers.facebook.com/docs/whatsapp/cloud-api

9. **Server-side conversion API for Meta Pixel** — current pixel is client-side only. Add `/api/conversions/meta` that fires `Lead` and `Purchase` server-side via the Conversions API. This recovers signal lost to iOS 14+ / cookie blockers.
   Doc: https://developers.facebook.com/docs/marketing-api/conversions-api

10. **Add a dynamic appointment booking page** at `/rendez-vous` that uses the existing `Appointment` Prisma model and `/api/appointment` route. Calendar UI: use `react-day-picker` (lightweight, accessible). Slots: 9:00–18:00, 30/60/90 min, exclude weekends.

11. **Add an `OG image generator`** at `/api/og?title=...&category=...` using `next/og` (`@vercel/og`). Each gamme page should have a unique OG image with the product name + category color.
   Doc: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image

12. **Add product comparison** — let users add up to 3 climatiseurs to a "Comparer" tray (separate from cart) and view a side-by-side spec sheet at `/climatisation/comparer?ids=a,b,c`.

13. **Add the `Search` overlay** with `cmdk` (https://cmdk.paco.me/). Index: catalog items, blog posts, services. Trigger with `Cmd/Ctrl+K` or a search icon in header.

14. **Add server-side image optimization with Cloudinary** (or ImageKit). Current setup uses next/image which is fine for static, but for user-uploaded reviews/realizations we need a CDN. Set `NEXT_PUBLIC_CLOUDINARY_URL` and update `next.config.mjs` images.remotePatterns.

### P2 — Operational excellence

15. **Replace single-password admin auth with NextAuth + AdminUser table.** The schema (`AdminUser` with `bcrypt`) already exists. Use `next-auth@beta` (v5) with Credentials provider.
    Doc: https://authjs.dev/getting-started/installation?framework=next.js

16. **Add CSV export for `/admin/leads` and `/admin/quotes`** (download button → server action that streams CSV).

17. **Add a Slack webhook** (or Telegram) so high-score leads (>=70) ping the sales team in real-time. Set `SLACK_WEBHOOK_URL` and call from `lib/leads.ts` after `notifySalesTeam`.

18. **Add rate limiting** on all `/api/*` routes using `@upstash/ratelimit` or a simple in-memory limiter. 5 req/min per IP for forms, 30 req/min for read-only routes.

19. **Add CSP headers** in `next.config.mjs` (script-src, img-src, connect-src) to harden against XSS. Whitelist: GA4, Meta Pixel, Resend, Cloudinary.

20. **Add `Sentry`** (or `@logtail/next`) for error tracking. Wrap `app/error.tsx` and `app/global-error.tsx`. Use `withSentryConfig` in `next.config.mjs`.

21. **Add full-page server-side caching** for the home, brand, and gamme pages with ISR (`revalidate: 3600`). The catalog is mostly static — no need to render fresh on every request.

22. **Add a `Cron` route** at `/api/cron/digest` that runs every morning, aggregates the previous day's leads, and emails the sales team a digest. Use Vercel Cron, Coolify cron, or a simple node-cron container.

### P3 — Content & SEO

23. **Write 12 SEO articles** in `content/blog.ts` (currently 3). Topics: "Comparatif climatisation MEGALIFE vs LG", "Combien coute une piscine au Maroc", "Tarif kWc solaire Maroc 2026", "Renovation villa Marrakech: budget reel", etc. 1500+ words each, French, with H2/H3 structure and internal links to gamme pages.

24. **Add `BreadcrumbList` JSON-LD** on every gamme/blog/service page (helper exists in `lib/seo.ts`).

25. **Add a city-targeted landing page** for each major city: `/climatisation/casablanca`, `/climatisation/marrakech`, etc. Content: same catalog filtered by region, plus city-specific photos + testimonials.

26. **Translate the entire site to Arabic** (RTL) using `next-intl`. Routes become `/ar/*`. Auto-detect via `Accept-Language` and store preference in cookie.

27. **Add a comprehensive FAQPage schema** on /a-propos with 20+ questions covering pricing process, payment terms, delivery, warranty, after-sales.

### P4 — Future revenue features

28. **Loyalty program** — referral codes for clients (5% commission for the referrer when a referred lead converts). Add `Referral` model.

29. **Customer portal** at `/mon-projet` — clients log in with their phone+OTP and see their project status, invoices, photos of the worksite, and next milestones.

30. **B2B portal** at `/pro` — separate pricing list (CSV upload by admin), volume discounts, dedicated account manager. Hidden from public.

---

## 7. CRO TARGETS (KPIs to instrument and beat)

| KPI | Baseline | 90-day target |
|---|---|---|
| LCP (mobile, 4G) | TBD measure | < 2.0s |
| CLS | TBD measure | < 0.05 |
| TBT | TBD measure | < 200ms |
| Visitor → Lead (any source) | TBD measure | **6%+** |
| Visitor → WhatsApp click | TBD measure | **3%+** |
| Lead score average | computed on insert | > 45 |
| Newsletter opt-in rate | TBD measure | 8% |
| Exit-intent capture rate | TBD measure | 12% |
| BTU calculator completion → email | TBD measure | 40% |
| Add-to-quote → WhatsApp checkout | TBD measure | 35% |
| Sales response time | manual | < 1h business hours |

Instrument all of these in a `/admin/dashboard` page (build with Recharts or visx, no Tableau).

---

## 8. CODING CONVENTIONS

- File naming: `PascalCase.tsx` for components, `camelCase.ts` for utilities, `kebab-case` for routes.
- Imports: use the `@/` alias (configured in `tsconfig.json`).
- Tailwind: use the custom palette (`ink`, `brand`, `sand`, `bone`, `wa`). Don't use raw hex values.
- Server Components by default. Add `"use client"` only when you need state, refs, browser APIs, or Zustand.
- API routes: always validate input with Zod from `lib/validation.ts`. Always return `{ ok: boolean, ... }`.
- Database: only access via `db` from `lib/db.ts` (the Prisma singleton).
- Errors: log to console, never leak stack traces to the response. Return generic 500 with `{ ok: false, error: "Server error" }`.
- WhatsApp links: always go through `whatsappContactUrl(reason)` or `whatsappCheckoutUrl(lines, catalog)` from `lib/whatsapp.ts`.
- Cart: use `useCart()` from `stores/cart.ts`. Never mutate `lines` directly.
- New product/service: add to the appropriate file in `content/catalog/*.ts`. The `index.ts` aggregator picks it up automatically.
- New blog post: append to `content/blog.ts`. The `[slug]` route picks it up via `generateStaticParams`.

---

## 9. COMMANDS CHEAT SHEET

```bash
npm install                # install deps
npm run dev                # dev server (port 3000)
npm run build              # full prod build (prisma generate + next build)
npm run start              # start built site (use only if NOT using Docker)
npm run lint               # eslint
npm run db:generate        # prisma generate
npm run db:migrate         # prisma migrate dev (local dev only)
npm run db:migrate:deploy  # prisma migrate deploy (production)
npm run db:studio          # prisma studio (visual DB browser, http://localhost:5555)
npm run db:push            # quick schema sync without migration (dev only)

docker compose up -d --build      # build + start app + db
docker compose logs -f rizal_app  # tail logs
docker compose exec rizal_app sh  # shell inside container
```

---

## 10. WHAT TO BUILD FIRST (your literal first session)

Do these in order, in one PR:

1. Run `npm install`, `npx prisma generate`, `npm run build` — verify everything still compiles on your machine.
2. Read `app/layout.tsx`, `app/page.tsx`, `lib/site.ts`, `prisma/schema.prisma`, `stores/cart.ts`, `lib/whatsapp.ts`, and `lib/leads.ts` — these define the architecture.
3. Set up a local Postgres container (`docker run -d -p 5432:5432 -e POSTGRES_USER=rizal -e POSTGRES_PASSWORD=rizal -e POSTGRES_DB=rizal --name rizal_database postgres:16-alpine`).
4. Override `DATABASE_URL` in `.env.local` to `postgres://rizal:rizal@localhost:5432/rizal?sslmode=disable`.
5. Run `npx prisma migrate dev --name init` to generate the initial migration.
6. Run `npm run dev` and visit `/contact`, fill the form, then visit `/admin/login` (password from `ADMIN_BOOTSTRAP_PASSWORD`), then `/admin/leads` — confirm your test lead appears.
7. Tackle items #1–#7 from the **P0 work queue** above.

---

## 11. HOW THE PIECES FIT TOGETHER

```
┌─────────────────────────────────────────────────────────────────┐
│  USER VISITS rizal.click                                        │
│   → HeroCarousel (3 slides FR + AR badges)                      │
│   → TrustRibbon (4.9★ Google + garantie + délais + officiels)   │
│   → Categories grid (4 univers)                                 │
│   → Brand cards (MEGALIFE, INGELEC, LG, TRANE)                  │
│   → Featured selection (cross-sell-aware)                       │
│   → BrandComparator + ReviewsBlock + FAQ                        │
│   → CTA → WhatsApp                                              │
│                                                                 │
│  USER ADDS PRODUCT TO QUOTE                                     │
│   → useCart().add(itemId) (Zustand + localStorage)              │
│   → CartDrawer opens, shows cross-sells (lib/crossSell.ts)      │
│                                                                 │
│  USER CLICKS "Finaliser sur WhatsApp"                           │
│   → CartDrawer fires sendBeacon('/api/quote', { lines })        │
│   → Quote + Lead persisted to Postgres                          │
│   → window opens wa.me with pre-filled text from                │
│     whatsappCheckoutUrl(lines, catalog)                         │
│                                                                 │
│  EXIT INTENT (mouse leaves viewport top, or 90s idle)           │
│   → ExitIntent modal offers PDF guide                           │
│   → POST /api/lead-magnet → Lead + Subscriber + open PDF        │
│                                                                 │
│  SCROLL > 6s ON DESKTOP                                         │
│   → SocialProofLive bottom-left card                            │
│     ("38 villas étudiées cette semaine, 7 devis aujourd'hui")   │
│     → fetched live from /api/social-proof (cached 60s)          │
│                                                                 │
│  ON MOBILE                                                      │
│   → StickyMobileCTA (Appeler / WhatsApp / Mon Devis)            │
│                                                                 │
│  USER OPENS /outils                                             │
│   → BTU Calculator (climat marocain) + Solar kWc Calculator     │
│   → POST /api/calculator → Lead with score + result             │
│                                                                 │
│  ADMIN VISITS /admin                                            │
│   → middleware.ts checks 'rizal_admin' cookie                   │
│   → /admin/leads, /admin/quotes, /admin/subscribers             │
│                                                                 │
│  EVERY LEAD                                                     │
│   → Score computed (lib/leads.ts) 0-100                         │
│   → Resend email to sales team (if RESEND_API_KEY set)          │
│   → (next: Slack ping for score >= 70, WhatsApp template)       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. THINGS TO ABSOLUTELY NOT DO

- ❌ Never display prices on any page (this is the entire business model)
- ❌ Never add a Stripe / payment integration on the site
- ❌ Never replace WhatsApp checkout with email checkout — WhatsApp IS the funnel
- ❌ Never break the cart's localStorage persistence (hydrate carefully)
- ❌ Never add new top-level routes without updating `next-sitemap.config.js`
- ❌ Never commit `.env.local` to git
- ❌ Never use raw `fetch` to the DB — always go through Prisma
- ❌ Never log PII (phone, email) to console in production
- ❌ Never remove the `output: 'standalone'` from `next.config.mjs` (Docker depends on it)
- ❌ Never add a CSS framework other than Tailwind (no styled-components, no emotion, no css modules)
- ❌ Never bypass the Zod validation layer on API routes
- ❌ Never use `any` in TypeScript without a `// eslint-disable-next-line` comment explaining why

---

## 13. SUPPORT / OWNERSHIP

- Domain registrar: rizal.click (owner: brand)
- Postgres: self-hosted Docker container `rizal_database` (volume `rizal_db_data`)
- Email transactional: Resend (account to be created)
- Analytics: GA4 + Meta Pixel (accounts to be created)
- Hosting: Docker (Coolify / Dokploy / VPS recommended)
- Source of truth for product specs: `content/catalog/*.ts` (do not duplicate)

---

**Welcome aboard. Build with care, ship fast, measure everything.**
