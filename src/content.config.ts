import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writeups = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/writeups',
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      author: z.string(),
      tags: z.array(z.string()).default([]),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
      platform: z.string(),
      category: z.string(),
      coverImage: image().optional(),
      coverAlt: z.string(),
      readingTime: z.number().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { writeups };
