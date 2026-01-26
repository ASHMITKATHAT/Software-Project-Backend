import { Router } from 'express';
import { createDeployment, getDeployments, getDeploymentById, updateDeployment, deleteDeployment, updateDeploymentStatus } from '../controllers/deploymentController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createDeployment);
router.get('/', protect, getDeployments);
router.get('/:id', protect, getDeploymentById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateDeployment);
router.delete('/:id', protect, authorize(['Admin']), deleteDeployment);
router.patch('/:id/status', protect, authorize(['Admin', 'Manager']), updateDeploymentStatus);

export default router;