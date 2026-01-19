import { Request, Response } from 'express';
import * as milestoneService from '../services/milestoneService';
import { logger } from '../config/logger';

export const createMilestone = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const milestone = await milestoneService.createMilestone(data, (req as any).user.id);
    res.status(201).json(milestone);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getMilestones = async (req: Request, res: Response) => {
  try {
    const milestones = await milestoneService.getAllMilestones(req.params.projectId);
    res.json(milestones);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getMilestoneById = async (req: Request, res: Response) => {
  try {
    const milestone = await milestoneService.getMilestoneById(req.params.id);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });
    res.json(milestone);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await milestoneService.updateMilestone(req.params.id, req.body);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });
    res.json(milestone);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteMilestone = async (req: Request, res: Response) => {
  try {
    const milestone = await milestoneService.deleteMilestone(req.params.id);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });
    res.json({ msg: 'Milestone removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateMilestoneProgress = async (req: Request, res: Response) => {
  try {
    const { progress } = req.body;
    const milestone = await milestoneService.updateMilestoneProgress(req.params.id, progress);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });
    res.json(milestone);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};