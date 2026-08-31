import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string(),
    image: z.string().optional(),
    lang: z.enum(['cs', 'en']).default('cs'),
    tags: z.array(z.string()).optional(),
  }),
})

export const collections = { blog }
