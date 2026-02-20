import { Router } from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController';
import { protect, authorize } from '../middlewares/auth';
import { projectSchema, projectIdSchema } from '../validators/projectValidator';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.post('/', protect, authorize(['Admin']), validateRequest(projectSchema), createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, validateRequest(projectIdSchema), getProjectById);
router.put('/:id', protect, authorize(['Admin']), validateRequest(projectSchema).extend({ id: projectIdSchema }), updateProject);
router.delete('/:id', protect, authorize(['Admin']), validateRequest(projectIdSchema), deleteProject);

export default router;
// Added member management endpoints
