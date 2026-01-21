import { Request, Response } from 'express';
import * as environmentService from '../services/environmentService';
import { logger } from '../config/logger';

export const createEnvironment = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const env = await environmentService.createEnvironment(data, (req as any).user.id);
    res.status(201).json(env);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getEnvironments = async (req: Request, res: Response) => {
  try {
    const environments = await environmentService.getAllEnvironments(req.params.projectId);
    res.json(environments);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getEnvironmentById = async (req: Request, res: Response) => {
  try {
    const env = await environmentService.getEnvironmentById(req.params.id);
    if (!env) return res.status(404).json({ msg: 'Environment not found' });
    res.json(env);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateEnvironment = async (req: Request, res: Response) => {
  try {
    const env = await environmentService.updateEnvironment(req.params.id, req.body);
    if (!env) return res.status(404).json({ msg: 'Environment not found' });
    res.json(env);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteEnvironment = async (req: Request, res: Response) => {
  try {
    const env = await environmentService.deleteEnvironment(req.params.id);
    if (!env) return res.status(404).json({ msg: 'Environment not found' });
    res.json({ msg: 'Environment removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const toggleEnvironment = async (req: Request, res: Response) => {
  try {
    const env = await environmentService.toggleEnvironmentActive(req.params.id);
    if (!env) return res.status(404).json({ msg: 'Environment not found' });
    res.json(env);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};