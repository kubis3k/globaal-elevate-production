import { ui, defaultLocale, locales, type Locale, type UiKey } from './ui';

/** Extracts the locale from an Astro URL, following the project's
 * `prefixDefaultLocale: false` routing (cs = no prefix, en = "/en/..."). */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  if (locales.includes(maybeLocale as Locale) && maybeLocale !== defaultLocale) {
    return maybeLocale as Locale;
  }
  return defaultLocale;
}

/** Returns a `t(key)` translator bound to the given locale, falling back to
 * the default locale's string if a key is missing. */
export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale]?.[key] ?? ui[defaultLocale][key];
  };
}

/** Prefixes a locale-relative path with the locale segment, unless it's the
 * default locale (which has no prefix). Expects `path` to start with "/". */
export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

/** Strips a known locale prefix from a pathname, returning the "bare" path
 * used to look up the equivalent page in another locale. */
export function unlocalizePath(pathname: string): string {
  const segments = pathname.split('/');
  const maybeLocale = segments[1];
  if (locales.includes(maybeLocale as Locale) && maybeLocale !== defaultLocale) {
    const rest = '/' + segments.slice(2).join('/');
    return rest === '/' ? '/' : rest.replace(/\/$/, '') || '/';
  }
  return pathname === '' ? '/' : pathname;
}

interface AlternateLink {
  hreflang: string;
  href: string;
}

/** Builds hreflang alternate links (including x-default) for a given bare
 * path, for use in <Seo>. `siteUrl` must not have a trailing slash. */
export function getAlternateLinks(barePath: string, siteUrl: string): AlternateLink[] {
  const hreflangMap: Record<Locale, string> = { cs: 'cs', en: 'en' };
  const links: AlternateLink[] = locales.map((locale) => ({
    hreflang: hreflangMap[locale],
    href: `${siteUrl}${localizePath(barePath, locale)}`,
  }));
  links.push({
    hreflang: 'x-default',
    href: `${siteUrl}${localizePath(barePath, defaultLocale)}`,
  });
  return links;
}
