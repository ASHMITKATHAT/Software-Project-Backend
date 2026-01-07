import { z } from 'zod';

export const milestoneSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().max(3000).optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['pending', 'in_progress', 'completed', 'overdue', 'cancelled']).optional().default('pending'),
  progress: z.number().min(0).max(100).optional(),
  deliverables: z.array(z.string()).optional(),
  dependencies: z.array(z.string()).optional(),
  assignedTo: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const milestoneUpdateSchema = milestoneSchema.partial();