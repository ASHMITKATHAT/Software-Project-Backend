import { Request, Response } from 'express';
import * as sprintService from '../services/sprintService';
import { logger } from '../config/logger';

export const createSprint = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const sprint = await sprintService.createSprint(data);
    res.status(201).json(sprint);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getSprints = async (req: Request, res: Response) => {
  try {
    const sprints = await sprintService.getAllSprints(req.params.projectId);
    res.json(sprints);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getSprintById = async (req: Request, res: Response) => {
  try {
    const sprint = await sprintService.getSprintById(req.params.id);
    if (!sprint) return res.status(404).json({ msg: 'Sprint not found' });
    res.json(sprint);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateSprint = async (req: Request, res: Response) => {
  try {
    const sprint = await sprintService.updateSprint(req.params.id, req.body);
    if (!sprint) return res.status(404).json({ msg: 'Sprint not found' });
    res.json(sprint);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteSprint = async (req: Request, res: Response) => {
  try {
    const sprint = await sprintService.deleteSprint(req.params.id);
    if (!sprint) return res.status(404).json({ msg: 'Sprint not found' });
    res.json({ msg: 'Sprint removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const startSprint = async (req: Request, res: Response) => {
  try {
    const sprint = await sprintService.startSprint(req.params.id);
    if (!sprint) return res.status(404).json({ msg: 'Sprint not found' });
    res.json(sprint);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const completeSprint = async (req: Request, res: Response) => {
  try {
    const sprint = await sprintService.completeSprint(req.params.id);
    if (!sprint) return res.status(404).json({ msg: 'Sprint not found' });
    res.json(sprint);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};