import { Router } from 'express';
import { createEnvironment, getEnvironments, getEnvironmentById, updateEnvironment, deleteEnvironment, toggleEnvironment } from '../controllers/environmentController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin']), createEnvironment);
router.get('/', protect, getEnvironments);
router.get('/:id', protect, getEnvironmentById);
router.put('/:id', protect, authorize(['Admin']), updateEnvironment);
router.delete('/:id', protect, authorize(['Admin']), deleteEnvironment);
router.patch('/:id/toggle', protect, authorize(['Admin']), toggleEnvironment);

export default router;