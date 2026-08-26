import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/pages',
    // Frontmatter `slug` is the URL slug (e.g. "index", "marketing"), shared
    // between cs/en variants of the same page — using it as the entry id
    // (the glob loader default) collides across locales. Derive the id from
    // the filename instead (e.g. "home.cs", "marketing.en").
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    locale: z.enum(['cs', 'en']),
    slug: z.string(),
    h1: z.string(),
    heroLead: z.string().optional(),
    sections: z
      .array(
        z.object({
          id: z.string(),
          heading: z.string().optional(),
          body: z.string(),
        })
      )
      .default([]),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
    steps: z
      .array(
        z.object({
          n: z.number(),
          title: z.string(),
          body: z.string(),
        })
      )
      .optional(),
    ctas: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          external: z.boolean().default(false),
          note: z.string().optional(),
        })
      )
      .optional(),
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
  }),
});

const brands = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/brands' }),
  schema: z.object({
    name: z.string(),
    pillar: z.enum(['events', 'music', 'ticketing', 'saas', 'marketing']),
    summary: z.string().max(220),
    url: z.string().url().optional(),
    external: z.boolean().default(false),
    status: z.enum(['live', 'building']).default('live'),
    order: z.number(),
  }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    pillar: z.enum(['events', 'music', 'ticketing', 'saas', 'marketing']),
    brand: z.string().optional(),
    employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN']),
    location: z.string().default('Chomutov, Česko'),
    remote: z.boolean().default(false),
    salaryMin: z.number().optional(),
    salaryMax: z.number().optional(),
    salaryCurrency: z.string().default('CZK'),
    salaryUnit: z.enum(['MONTH', 'HOUR']).default('MONTH'),
    datePosted: z.coerce.date(),
    validThrough: z.coerce.date().optional(),
    applyEmail: z.string().email(),
    active: z.boolean().default(true),
  }),
});

const company = defineCollection({
  loader: file('./src/content/company/company.json'),
  schema: z.object({
    legalName: z.string(),
    brandNames: z.array(z.string()),
    ico: z.string(),
    city: z.string(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().default('CZ'),
    directorName: z.string().default(''),
    emails: z.object({
      business: z.string(),
      booking: z.string(),
      general: z.string(),
    }),
    instagram: z.array(z.string()),
    siteUrl: z.string(),
  }),
});

export const collections = { pages, brands, jobs, company };
