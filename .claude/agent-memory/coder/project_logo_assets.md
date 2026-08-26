---
name: project-logo-assets
description: How src/assets logo variants and public favicons/OG image are generated from public/logo-source.png
metadata:
  type: project
---

`scripts/generate-assets.mjs` (run via `npm run assets:logo`) regenerates `src/assets/logo-wordmark.png`, `src/assets/logo-mark.png`, `public/favicon-32.png`, `public/favicon-180.png`, `public/og-default.png` from `public/logo-source.png` (2000x2000 canvas, wordmark "GLOBAAL [planet icon] ELEVATE / PRODUCTION" centered, huge white margins).

The planet-icon extract region (`extractRegion` in the script) was tuned by trial to `{ left: 895, top: 865, width: 208, height: 270 }` — this isolates the planet+ring+sparkle icon between "GLOBAAL" and "ELEVATE" without cutting into either word's letters. A couple of the smallest decorative sparkle points get slightly clipped at this crop, which was accepted per the plan's explicit tolerance ("wider crop around it is fine, cut-off letters are not").

**Why:** The source file has no dedicated icon-only asset; the icon had to be extracted from the wordmark composite by pixel coordinates, and exact coordinates only became correct after ~3 iterations of extract+trim+visual check.

**How to apply:** If `logo-source.png` is ever replaced with a new export (e.g., higher-res or repositioned), the hardcoded `extractRegion` will very likely need retuning — re-run the script, then visually inspect `src/assets/logo-mark.png` with the Read tool before trusting it, don't assume the coordinates still apply. The primary favicon is a hand-written `public/favicon.svg` (black circle + purple `#7606FF` ring/sparkle), independent of this script.
