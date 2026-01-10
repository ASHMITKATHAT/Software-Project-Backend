import { z } from 'zod';

export const environmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['development', 'staging', 'production', 'testing', 'qa']),
  baseUrl: z.string().url('Must be a valid URL'),
  apiKey: z.string().optional(),
  variables: z.record(z.string()).optional(),
  isActive: z.boolean().optional().default(true),
  config: z.record(z.any()).optional(),
});

export const environmentUpdateSchema = environmentSchema.partial();