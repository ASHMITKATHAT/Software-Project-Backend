import { z } from 'zod';

export const releaseSchema = z.object({
  version: z.string().min(1, 'Version is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().max(2000).optional(),
  status: z.enum(['planned', 'in_progress', 'released', 'rolled_back', 'cancelled']).optional().default('planned'),
  releaseDate: z.string().optional(),
  sprintIds: z.array(z.string()).optional(),
  issueIds: z.array(z.string()).optional(),
  releaseNotes: z.string().max(10000).optional(),
  tags: z.array(z.string()).optional(),
});

export const releaseUpdateSchema = releaseSchema.partial();