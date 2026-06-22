import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import { logger } from './config/logger';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app: Express = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use(express.json()); // Body parser

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Simple root route
app.get('/', (req: Request, res: Response) => {
  res.send('Software Project Backend API is running!');
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

export default app;
