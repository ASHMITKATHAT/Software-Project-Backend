import { Router } from 'express';
import { createResource, getResources, getResourceById, updateResource, deleteResource, allocateResource, deallocateResource } from '../controllers/resourceController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createResource);
router.get('/', protect, getResources);
router.get('/:id', protect, getResourceById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateResource);
router.delete('/:id', protect, authorize(['Admin']), deleteResource);
router.post('/:id/allocate', protect, authorize(['Admin', 'Manager']), allocateResource);
router.post('/:id/deallocate', protect, authorize(['Admin', 'Manager']), deallocateResource);

export default router;