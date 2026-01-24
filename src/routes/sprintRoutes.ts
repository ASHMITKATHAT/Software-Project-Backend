import { Router } from 'express';
import { createSprint, getSprints, getSprintById, updateSprint, deleteSprint, startSprint, completeSprint } from '../controllers/sprintController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createSprint);
router.get('/', protect, getSprints);
router.get('/:id', protect, getSprintById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateSprint);
router.delete('/:id', protect, authorize(['Admin']), deleteSprint);
router.post('/:id/start', protect, authorize(['Admin', 'Manager']), startSprint);
router.post('/:id/complete', protect, authorize(['Admin', 'Manager']), completeSprint);

export default router;