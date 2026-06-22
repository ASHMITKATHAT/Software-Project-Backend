import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name cannot exceed 100 characters'),
  description: z.string().min(0, 'Description can be empty').max(1000, 'Description cannot exceed 1000 characters'),
});

export const projectIdSchema = z.string().uuid('Invalid project ID format');
