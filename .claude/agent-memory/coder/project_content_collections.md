---
name: project-content-collections
description: Content collections were removed in the 2026-08-28 full rebuild; site now uses direct Astro markup
metadata:
  type: project
---

Content collections (company.json, brands/*.md, pages/*.md) were part of the previous codebase and were **removed** in the full scaffold rebuild on 2026-08-28. The new site uses direct Astro markup — page data lives inline in each `.astro` file.

**Why:** The task specified a clean rebuild without content collections to reduce complexity for a simple corporate holding site.

**How to apply:** Do not assume content collections or .md source files exist. All page content is in `src/pages/**/*.astro` directly. If content collections need to be re-added, treat it as a new feature.
