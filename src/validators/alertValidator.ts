import { z } from 'zod';

export const alertSchema = z.object({
  type: z.enum(['error', 'warning', 'info', 'critical', 'performance']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  title: z.string().min(1, 'Title is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
  source: z.string().min(1, 'Source is required'),
  metric: z.string().optional(),
  value: z.number().optional(),
  threshold: z.number().optional(),
  metadata: z.record(z.any()).optional(),
});

export const alertUpdateSchema = z.object({
  status: z.enum(['active', 'acknowledged', 'resolved', 'dismissed']).optional(),
  acknowledgedBy: z.string().optional(),
  resolvedBy: z.string().optional(),
});