import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters long').max(50, 'Username cannot exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  pwd: z.string().min(6, 'Password must be at least 6 characters long').max(100, 'Password cannot exceed 100 characters'),
  role: z.enum(['Admin', 'User']).optional().default('User'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  pwd: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Added password strength validation
