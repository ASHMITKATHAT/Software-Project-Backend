import { Router } from 'express';
import { createMilestone, getMilestones, getMilestoneById, updateMilestone, deleteMilestone, updateMilestoneProgress } from '../controllers/milestoneController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createMilestone);
router.get('/', protect, getMilestones);
router.get('/:id', protect, getMilestoneById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateMilestone);
router.delete('/:id', protect, authorize(['Admin']), deleteMilestone);
router.patch('/:id/progress', protect, authorize(['Admin', 'Manager']), updateMilestoneProgress);

export default router;