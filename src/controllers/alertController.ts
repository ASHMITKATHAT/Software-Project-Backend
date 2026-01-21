import { Request, Response } from 'express';
import * as alertService from '../services/alertService';
import { logger } from '../config/logger';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const alert = await alertService.createAlert(data);
    res.status(201).json(alert);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getAlerts = async (req: Request, res: Response) => {
  try {
    const alerts = await alertService.getAllAlerts(req.params.projectId, req.query);
    res.json(alerts);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getAlertById = async (req: Request, res: Response) => {
  try {
    const alert = await alertService.getAlertById(req.params.id);
    if (!alert) return res.status(404).json({ msg: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const acknowledgeAlert = async (req: Request, res: Response) => {
  try {
    const alert = await alertService.acknowledgeAlert(req.params.id, (req as any).user.id);
    if (!alert) return res.status(404).json({ msg: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const resolveAlert = async (req: Request, res: Response) => {
  try {
    const alert = await alertService.resolveAlert(req.params.id, (req as any).user.id);
    if (!alert) return res.status(404).json({ msg: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const dismissAlert = async (req: Request, res: Response) => {
  try {
    const alert = await alertService.dismissAlert(req.params.id);
    if (!alert) return res.status(404).json({ msg: 'Alert not found' });
    res.json(alert);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getAlertStats = async (req: Request, res: Response) => {
  try {
    const stats = await alertService.getAlertStats(req.params.projectId);
    res.json(stats);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};