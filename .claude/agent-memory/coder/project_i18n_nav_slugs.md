---
name: project-i18n-nav-slugs
description: CZ and EN nav slugs are finalized and live; Header uses lang prop to switch between route sets
metadata:
  type: project
---

Header nav links are implemented and working as of 2026-08-28 rebuild.

CZ routes: `/`, `/o-nas`, `/portfolio`, `/kontakt`
EN routes: `/en/`, `/en/about`, `/en/portfolio`, `/en/contact`

Lang switcher: CZ header links to `/en/` (with label "EN"), EN header links to `/` (with label "CS").

**Why:** Previous memory noted these were placeholder slugs; they are now real page routes.

**How to apply:** If adding new pages, add them to both `navCs` and `navEn` arrays in `src/components/Header.astro`.
