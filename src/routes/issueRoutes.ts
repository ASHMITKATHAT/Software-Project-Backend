import { Router } from 'express';
import { createIssue, getIssues, getIssueById, updateIssue, deleteIssue, addComment } from '../controllers/issueController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager', 'Developer']), createIssue);
router.get('/', protect, getIssues);
router.get('/:id', protect, getIssueById);
router.put('/:id', protect, authorize(['Admin', 'Manager', 'Developer']), updateIssue);
router.delete('/:id', protect, authorize(['Admin']), deleteIssue);
router.post('/:id/comments', protect, addComment);

export default router;