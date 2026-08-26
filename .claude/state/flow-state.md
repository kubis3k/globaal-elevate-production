# FLOW STATE

## Aktuální úkol
- cíl: Astro+Tailwind korporátní web globaalelevate.com (CZ/EN, SEO, AI crawlers) — **DONE**
- tier: T3
- status: **done**

## Finální stav (2026-08-25)
- poslední krok: Kompletní Astro 5 korporátní web postaven a ověřen (build PASS, critic PASS, vizuální kontrola hotová). ZBÝVÁ: GitHub repo + Vercel deploy (udělá uživatel nebo příští session).
- Co existuje v projektu:
  - CZ stránky: /, /o-nas, /marketing, /portfolio, /kariera, /kontakt, /gdpr, /404
  - EN stránky: /en/, /en/about, /en/marketing (redirect-stub na cs verze pro zbylé)
  - hreflang alternates na 3 párech (home, o-nas/about, marketing)
  - JSON-LD: Organization+WebSite na home+kontakt; FAQPage+Service na marketing; JobPosting podmíněné (aktivuje se až bude jobs collection naplněná)
  - SEO: robots.txt s AI crawlery, llms.txt, sitemap autom., og-default.png
  - CookieBanner (no-cookie-by-default), ContactForm island + /api/contact Resend endpoint (prerender=false)
  - Content Collections: pages (CZ+EN verze), brands, jobs (prázdná), company
  - Logo: src/assets/logo-wordmark.png + logo-mark.png; public/og-default.png

## Klíčová rozhodnutí (append-only)
- [2026-08-25] Akcentová barva #7606FF z loga (RGB 118,6,255)
- [2026-08-25] Astro 5 + @astrojs/vercel@9, Tailwind v4 CSS-first, Inter Variable self-hosted, Vercel Analytics cookieless
- [2026-08-25] content.config.ts `generateId: ({ entry }) => entry.replace(/\.md$/, '')` pro pages collection — id: "home.cs", "home.en", "marketing.cs" atd., aby se i18n varianty nekomplikly
- [2026-08-25] PageLayout.astro slouží jako sjednocené "Hero" (jeden <h1> + heroLead na všech stránkách), zamezuje zdvojení h1 a potřebu zvlášť volat Hero komponentu
- [2026-08-25] company.json bez vyplněných street, postalCode, directorName; kontakt.astro je podmíněně filtruje; ContactForm bez TestimonialsSection (komponenta v codebase neexistuje)

## Otevřené věci pro příští session
1. GitHub repo + Vercel deploy (gh CLI nebo Vercel MCP)
2. Env vars ve Vercel: RESEND_API_KEY, RESEND_TO_BUSINESS, RESEND_TO_BOOKING
3. Ověřit doménu globaalelevate.com v Resend (from: web@globaalelevate.com)
4. Naplnit src/content/jobs/ reálnými pozicemi (aktivuje JobPosting JSON-LD)
5. Doplnit jednatele do company.json až bude vhodné
6. Aktivovat TestimonialsSection až budou reálné reference
