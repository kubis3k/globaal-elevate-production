---
name: project-logo-assets
description: Logo is text-based in Header; favicon is SVG (G in circle); no image pipeline scripts remain
metadata:
  type: project
---

After the 2026-08-28 rebuild, the logo is purely text-based: "Globaal Elevate" in Inter bold + accent-colored period, rendered directly in `src/components/Header.astro` and `src/components/Footer.astro`.

The `generate-assets.mjs` script and `public/logo-source.png` were removed — they are no longer part of the project.

Favicon: `public/favicon.svg` — simple SVG with "G" letter in a purple circle (#7606ff).

**Why:** Clean rebuild removed binary assets and the generation script to simplify the project.

**How to apply:** If a graphic logo is needed, add it as an SVG or PNG to `public/` and update the `<a class="logo">` element in Header/Footer.
