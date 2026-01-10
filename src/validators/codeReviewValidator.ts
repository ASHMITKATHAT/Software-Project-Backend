import { z } from 'zod';

export const codeReviewSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().max(5000).optional(),
  pullRequestUrl: z.string().url().optional().or(z.literal('')),
  branch: z.string().min(1, 'Branch is required'),
  status: z.enum(['pending', 'in_review', 'approved', 'changes_requested', 'closed']).optional().default('pending'),
  reviewers: z.array(z.string()).optional(),
  filesChanged: z.number().min(0).optional(),
  linesAdded: z.number().min(0).optional(),
  linesRemoved: z.number().min(0).optional(),
});

export const codeReviewUpdateSchema = codeReviewSchema.partial();