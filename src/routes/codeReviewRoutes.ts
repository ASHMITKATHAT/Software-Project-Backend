import { Router } from 'express';
import { createCodeReview, getCodeReviews, getCodeReviewById, updateCodeReview, deleteCodeReview, addComment, updateReviewerStatus } from '../controllers/codeReviewController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager', 'Developer']), createCodeReview);
router.get('/', protect, getCodeReviews);
router.get('/:id', protect, getCodeReviewById);
router.put('/:id', protect, authorize(['Admin', 'Manager', 'Developer']), updateCodeReview);
router.delete('/:id', protect, authorize(['Admin']), deleteCodeReview);
router.post('/:id/comments', protect, addComment);
router.post('/:id/reviewers', protect, authorize(['Admin', 'Manager']), updateReviewerStatus);

export default router;