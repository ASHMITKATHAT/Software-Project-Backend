import { Router } from 'express';
import { createRequirement, getRequirements, getRequirementById, updateRequirement, deleteRequirement } from '../controllers/requirementController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createRequirement);
router.get('/', protect, getRequirements);
router.get('/:id', protect, getRequirementById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateRequirement);
router.delete('/:id', protect, authorize(['Admin']), deleteRequirement);

export default router;