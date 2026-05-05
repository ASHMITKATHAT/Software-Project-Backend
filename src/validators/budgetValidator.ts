import { z } from 'zod';

export const budgetSchema = z.object({
  totalBudget: z.number().min(0, 'Total budget must be non-negative'),
  currency: z.string().optional().default('USD'),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'active', 'frozen', 'closed']).optional().default('draft'),
});

export const budgetUpdateSchema = budgetSchema.partial();

export const transactionSchema = z.object({
  description: z.string().min(1).max(500),
  amount: z.number(),
  type: z.enum(['expense', 'income', 'transfer']),
  date: z.string().optional(),
  receipt: z.string().optional(),
});
// Added transaction validation
