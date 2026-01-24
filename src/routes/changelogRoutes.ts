import { Router } from 'express';
import { createChangelog, getChangelogs, getChangelogById, updateChangelog, deleteChangelog, publishChangelog } from '../controllers/changelogController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createChangelog);
router.get('/', protect, getChangelogs);
router.get('/:id', protect, getChangelogById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateChangelog);
router.delete('/:id', protect, authorize(['Admin']), deleteChangelog);
router.post('/:id/publish', protect, authorize(['Admin', 'Manager']), publishChangelog);

export default router;