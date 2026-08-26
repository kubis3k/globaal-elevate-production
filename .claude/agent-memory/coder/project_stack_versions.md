---
name: project-stack-versions
description: Pinned dependency versions and why (Astro 5 vs latest 7, Tailwind v4 CSS-first)
metadata:
  type: project
---

Foundational layer (Fáze 1-3) pinned: `astro@5.18.2` + `@astrojs/vercel@9.0.5` + `@astrojs/sitemap@3.7.3`, Tailwind v4 via `@tailwindcss/vite` (CSS-first `@theme` in `src/styles/global.css`, no `tailwind.config.mjs`), `typescript@5.9.3` (not the new TS7 native rewrite, which is unstable for `astro/tsconfigs/strict` tooling).

**Why:** At implementation time (2026-08-25) npm's `latest` for `astro` was actually 7.2.6, and `@astrojs/vercel@11` requires `astro ^7.0.0`. The architect plan explicitly specified "Astro 5", so Astro 5.18.2 (latest 5.x) was installed together with `@astrojs/vercel@9.0.5`, the newest vercel adapter still compatible with Astro 5.

**How to apply:** If a future phase needs an Astro 7-only feature, this is a deliberate version ceiling to revisit — check `npm view @astrojs/vercel peerDependencies` before bumping astro past 5.x, since the vercel adapter major version is tightly coupled to the astro major version. See [[project-content-collections]] for content layer specifics tied to this Astro version.
