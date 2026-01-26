import { Router } from 'express';
import { createBudget, getBudgets, getBudgetById, updateBudget, deleteBudget, addTransaction, getBudgetSummary } from '../controllers/budgetController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createBudget);
router.get('/', protect, getBudgets);
router.get('/summary', protect, getBudgetSummary);
router.get('/:id', protect, getBudgetById);
router.put('/:id', protect, authorize(['Admin', 'Manager']), updateBudget);
router.delete('/:id', protect, authorize(['Admin']), deleteBudget);
router.post('/:id/transactions', protect, authorize(['Admin', 'Manager']), addTransaction);

export default router;