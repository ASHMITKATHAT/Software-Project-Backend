import { Router } from 'express';
import { createRelease, getReleases, getReleaseById, updateRelease, deleteRelease, publishRelease, getReleaseChangelogs } from '../controllers/releaseController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createRelease);
router.get('/', protect, getReleases);
router.get('/:id', protect, getReleaseById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateRelease);
router.delete('/:id', protect, authorize(['Admin']), deleteRelease);
router.post('/:id/publish', protect, authorize(['Admin', 'Manager']), publishRelease);
router.get('/:id/changelogs', protect, getReleaseChangelogs);

export default router;