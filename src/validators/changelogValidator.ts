import { z } from 'zod';

export const changelogEntrySchema = z.object({
  type: z.enum(['added', 'changed', 'fixed', 'deprecated', 'removed', 'security', 'performance']),
  description: z.string().min(1).max(1000),
  issueIds: z.array(z.string()).optional(),
});

export const changelogSchema = z.object({
  version: z.string().min(1),
  entries: z.array(changelogEntrySchema).min(1, 'At least one entry is required'),
  summary: z.string().max(5000).optional(),
  contributors: z.array(z.string()).optional(),
  publishedAt: z.string().optional(),
});

export const changelogUpdateSchema = changelogSchema.partial();