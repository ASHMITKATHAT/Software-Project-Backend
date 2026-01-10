import { z } from 'zod';

export const resourceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['human', 'equipment', 'software', 'infrastructure', 'budget']),
  description: z.string().max(2000).optional(),
  quantity: z.number().min(0, 'Quantity must be non-negative'),
  unit: z.string().min(1, 'Unit is required'),
  cost: z.number().min(0).optional().default(0),
  status: z.enum(['available', 'allocated', 'depleted', 'maintenance']).optional().default('available'),
  assignedTo: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const resourceUpdateSchema = resourceSchema.partial();