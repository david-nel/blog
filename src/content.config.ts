import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blankToUndefined = (value: unknown) => (value === null || value === '' ? undefined : value);

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.preprocess(blankToUndefined, z.coerce.date().optional()),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      series: z.string().optional(),
      seriesDescription: z.string().optional(),
      seriesOrder: z.preprocess(blankToUndefined, z.number().int().positive().optional()),
    }),
});

export const collections = { blog };
