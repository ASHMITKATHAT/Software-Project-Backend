import { z } from 'zod';

export const requirementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(5000).optional(),
  type: z.enum(['functional', 'non_functional', 'business', 'technical', 'user_story']).optional().default('functional'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional().default('medium'),
  status: z.enum(['draft', 'reviewed', 'approved', 'implemented', 'verified', 'rejected']).optional().default('draft'),
  acceptanceCriteria: z.array(z.string()).optional(),
  estimatedHours: z.number().min(0).optional(),
  assignedTo: z.string().optional(),
  parentRequirement: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const requirementUpdateSchema = requirementSchema.partial();
// Added acceptance criteria validation
