import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import requirementRoutes from './routes/requirementRoutes';
import issueRoutes from './routes/issueRoutes';
import releaseRoutes from './routes/releaseRoutes';
import changelogRoutes from './routes/changelogRoutes';
import sprintRoutes from './routes/sprintRoutes';
import milestoneRoutes from './routes/milestoneRoutes';
import codeReviewRoutes from './routes/codeReviewRoutes';
import deploymentRoutes from './routes/deploymentRoutes';
import environmentRoutes from './routes/environmentRoutes';
import alertRoutes from './routes/alertRoutes';
import resourceRoutes from './routes/resourceRoutes';
import budgetRoutes from './routes/budgetRoutes';
import { logger } from './config/logger';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();

connectDB();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/requirements', requirementRoutes);
app.use('/api/projects/:projectId/issues', issueRoutes);
app.use('/api/projects/:projectId/releases', releaseRoutes);
app.use('/api/projects/:projectId/releases/:releaseId/changelogs', changelogRoutes);
app.use('/api/projects/:projectId/sprints', sprintRoutes);
app.use('/api/projects/:projectId/milestones', milestoneRoutes);
app.use('/api/projects/:projectId/code-reviews', codeReviewRoutes);
app.use('/api/projects/:projectId/deployments', deploymentRoutes);
app.use('/api/projects/:projectId/environments', environmentRoutes);
app.use('/api/projects/:projectId/alerts', alertRoutes);
app.use('/api/projects/:projectId/resources', resourceRoutes);
app.use('/api/projects/:projectId/budgets', budgetRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Software Project Backend API is running!');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

export default app;