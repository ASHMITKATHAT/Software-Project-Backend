import { Router } from 'express';
import { createAlert, getAlerts, getAlertById, acknowledgeAlert, resolveAlert, dismissAlert, getAlertStats } from '../controllers/alertController';
import { protect, authorize } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.post('/', protect, authorize(['Admin', 'Manager']), createAlert);
router.get('/', protect, getAlerts);
router.get('/stats', protect, getAlertStats);
router.get('/:id', protect, getAlertById);
router.post('/:id/acknowledge', protect, acknowledgeAlert);
router.post('/:id/resolve', protect, resolveAlert);
router.post('/:id/dismiss', protect, authorize(['Admin', 'Manager']), dismissAlert);

export default router;