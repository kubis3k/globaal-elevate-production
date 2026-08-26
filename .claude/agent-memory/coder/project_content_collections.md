---
name: project-content-collections
description: pages/company/jobs content collection quirks — id generation, empty jobs, PageLayout path defaulting
metadata:
  type: project
---

- `company.json` wrapped as `{main: {...}}` for `file()` loader; jobs collection empty is expected, not a bug.
- Astro's `glob()` loader defaults to using the frontmatter `slug` field as entry `id` (not the filename). Since cs/en variants of the same page share the same `slug` value (e.g. both `home.cs.md` and `home.en.md` have `slug: index`), this caused silent id collisions ("index" overwritten). Fixed in `src/content.config.ts` by adding `generateId: ({ entry }) => entry.replace(/\.md$/, '')` to the `pages` collection, so ids are now filename-derived: `home.cs`, `home.en`, `marketing.cs`, etc. Always use this `<slug>.<locale>` format with `getEntry('pages', ...)`.
- `PageLayout.astro` derives the page's canonical `path` from `page.data.slug` as `/${slug}` when no explicit `path` prop is passed. This is wrong for the homepage, whose `slug` is `"index"` (would produce `/index`) — `src/pages/index.astro` must pass `path="/"` explicitly to `PageLayout`. Other pages' slugs already match their route (`o-nas`, `marketing`, `portfolio`, `kariera`, `kontakt`, `gdpr`), so the default works for them.
- `astro.config.mjs` has `i18n.fallback: { en: 'cs' }` + `prefixDefaultLocale: false`. For any page that doesn't yet have a real file under an `/en/` route, Astro statically prerenders a redirect-stub HTML at `/en/<path>/index.html` (meta-refresh to the cs URL) rather than duplicating content — confirmed by inspecting `dist/client/en/index.html`. Don't mistake this for a content/JSON-LD bug when auditing built output.
- [[project_i18n_nav_slugs]] — related: Header nav hrefs assume cs slugs for both locales.
