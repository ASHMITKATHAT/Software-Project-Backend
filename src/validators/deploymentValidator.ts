import { z } from 'zod';

export const deploymentSchema = z.object({
  releaseId: z.string().optional(),
  environmentId: z.string().min(1, 'Environment ID is required'),
  version: z.string().min(1, 'Version is required'),
  status: z.enum(['pending', 'in_progress', 'success', 'failed', 'rolled_back']).optional().default('pending'),
  buildId: z.string().optional(),
  commitSha: z.string().optional(),
  branch: z.string().min(1, 'Branch is required'),
  rollbackVersion: z.string().optional(),
  artifacts: z.array(z.string()).optional(),
});

export const deploymentUpdateSchema = deploymentSchema.partial();