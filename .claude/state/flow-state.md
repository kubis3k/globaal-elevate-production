# FLOW STATE

## Aktuální úkol
- cíl: Nový korporátní web Globaal Elevate od nuly — UzOman styl, CZ+EN, 4 stránky
- tier: T3
- status: scaffold dokončen, build OK

## Kde jsme skončili (checkpoint)
- poslední dokončený krok: scaffold dokončen — build OK (8 stránek, 0 chyb)
- soubory klíčové cesty:
  - package.json (astro@5.18.2, @astrojs/vercel@9.0.5, tailwindcss@^4.1.0, @tailwindcss/vite@^4.1.0)
  - astro.config.mjs (static output, vercel adapter, tailwindcss vite plugin)
  - src/styles/global.css (CSS custom properties, Tailwind v4, animace, karty, buttony)
  - src/layouts/BaseLayout.astro (html shell, Inter font, IntersectionObserver, theme toggle)
  - src/layouts/PageLayout.astro (subpage hero s badge/heading/lead)
  - src/components/Header.astro (logo, nav CZ+EN, lang switcher, theme toggle, hamburger)
  - src/components/Footer.astro (logo, tagline, links)
  - src/components/Hero.astro (full-bleed dark hero, badge, heading+accentPhrase, lead, 2x CTA)
  - src/components/GradientDecor.astro (radial gradient orb)
  - src/components/SectionLabel.astro (bullet label)
  - src/pages/index.astro (CZ homepage: hero + pilíře + o firmě + značky + CTA)
  - src/pages/o-nas.astro (CZ about: mise + hodnoty + značky)
  - src/pages/portfolio.astro (CZ portfolio: 5 karet)
  - src/pages/kontakt.astro (CZ contact: info + formulář)
  - src/pages/en/index.astro, en/about.astro, en/portfolio.astro, en/contact.astro (EN verze)
  - public/favicon.svg (G v kruhu, accent #7606ff)
- build status: OK — 8 stránek vygenerováno za 2.29s

## Mapa poznání (co víme o codebase)
- Astro 5.18.2 + @astrojs/vercel@9.0.5 (pinned)
- Tailwind CSS v4 CSS-first: @import "tailwindcss" v global.css, @tailwindcss/vite plugin v astro.config.mjs
- Inter font: Google Fonts link v BaseLayout (variable font, opsz 14..32, wght 300..700)
- Design tokens: CSS custom properties v :root + [data-theme="dark"] override
- Animace: IntersectionObserver v BaseLayout <script>, .anim-fade + .anim-stagger třídy v global.css
- Theme: localStorage 'theme' → data-theme attr na <html>, default dark
- Lang: lang prop přes BaseLayout → <html lang=...>, Header/Footer reagují na lang prop
- CZ stránky: /, /o-nas, /portfolio, /kontakt
- EN stránky: /en/, /en/about, /en/portfolio, /en/contact
- Layout vzor: asym-grid (280px 1fr), section-label bullet, card hover border-accent

## Klíčová rozhodnutí (append-only)
- [2026-08-25] Akcentová barva #7606FF z loga (RGB 118,6,255)
- [2026-08-25] Astro 5 + @astrojs/vercel@9, Tailwind v4 CSS-first, Inter Variable self-hosted
- [2026-08-25] PageLayout.astro slouží jako sjednocené hero pro podstránky
- [2026-08-28] Redesign do UzOman stylu — zachovat brand, změnit layout jazyk sekcí
- [2026-08-28] Redesign do UzOman corporate stylu dokončen: label-tag třída, asymetrické sekce (280px 1fr grid), anim-fade/stagger na sekcích, bullet section labely
- [2026-08-28] IntersectionObserver pro animace byl již přítomen v BaseLayout — nebyl duplikován
- [2026-08-28] Kompletní přestavba od nuly: vše smazáno, nový scaffold bez content collections, bez .md souborů — přímý Astro markup

## Otevřené otázky / následující session
- GDPR stránka: /gdpr odkaz v Footer ale stránka neexistuje (404) — přidat src/pages/gdpr.astro
- 404 stránka: neexistuje — přidat src/pages/404.astro
- Kontaktní formulář: POST na # — zapojit API endpoint nebo Formspree
- Reálný obsah: texty jsou placeholder, nutno nahradit reálnými
- Deployment: Vercel project linking + env vars
- SEO: sitemap, robots.txt, OG image
