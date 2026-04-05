import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(300),
  description: z.string().max(10000).optional(),
  type: z.enum(['bug', 'feature', 'improvement', 'task', 'documentation']).optional().default('bug'),
  severity: z.enum(['trivial', 'minor', 'major', 'critical', 'blocker']).optional().default('minor'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional().default('medium'),
  status: z.enum(['open', 'in_progress', 'resolved', 'closed', 'reopened', 'blocked']).optional().default('open'),
  assignee: z.string().optional(),
  labels: z.array(z.string()).optional(),
  fixVersion: z.string().optional(),
  dueDate: z.string().optional(),
  resolution: z.string().optional(),
  linkedIssues: z.array(z.object({ issueId: z.string(), relation: z.string() })).optional(),
  attachments: z.array(z.string()).optional(),
});

export const issueUpdateSchema = issueSchema.partial();
// Added severity-based validation
