import { z } from 'zod';

export const sprintSchema = z.object({
  name: z.string().min(1, 'Sprint name is required'),
  goal: z.string().max(2000).optional(),
  status: z.enum(['planning', 'active', 'completed', 'cancelled']).optional().default('planning'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  capacity: z.number().min(0).optional(),
  issueIds: z.array(z.string()).optional(),
  backlogIds: z.array(z.string()).optional(),
  retrospective: z.string().max(5000).optional(),
});

export const sprintUpdateSchema = sprintSchema.partial();