import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://globaalelevate.com',
  output: 'static',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: 'cs',
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'cs',
        locales: {
          cs: 'cs-CZ',
          en: 'en',
        },
      },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
