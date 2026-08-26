---
name: project-i18n-nav-slugs
description: Header nav uses identical CS slugs for both locales (only /en prefix differs) — a placeholder decision, not final content routing
metadata:
  type: project
---

`src/components/Header.astro` nav items use fixed Czech-style slugs (`/marketing`, `/portfolio`, `/o-nas`, `/kariera`, `/kontakt`) for both `cs` and `en` locales; only the locale prefix changes (`localizePath` adds `/en` for English, nothing for Czech, per `i18n.routing.prefixDefaultLocale: false` in `astro.config.mjs`).

**Why:** Phase 1-3 (foundational layer) intentionally excluded creating actual page content/slugs per the architect plan — that's a later phase's job. Real page slugs will come from the `pages` content collection (`slug` field, per-locale entries), and the Header/LangSwitcher logic should eventually resolve nav hrefs from that collection rather than a hardcoded list, especially if EN slugs should be different (e.g. `/about` vs `/o-nas`).

**How to apply:** When the pages/content-authoring agent creates the actual `pages` collection entries, revisit `src/components/Header.astro`'s `navItems` array and `src/i18n/utils.ts`'s `localizePath`/`unlocalizePath` to confirm they still match real slugs — don't assume the placeholder hrefs are final routes. See [[project-content-collections]].
