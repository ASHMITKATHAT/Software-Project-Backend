import { Request, Response } from 'express';
import * as deploymentService from '../services/deploymentService';
import { logger } from '../config/logger';

export const createDeployment = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const deployment = await deploymentService.createDeployment(data, (req as any).user.id);
    res.status(201).json(deployment);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getDeployments = async (req: Request, res: Response) => {
  try {
    const deployments = await deploymentService.getAllDeployments(req.params.projectId);
    res.json(deployments);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getDeploymentById = async (req: Request, res: Response) => {
  try {
    const deployment = await deploymentService.getDeploymentById(req.params.id);
    if (!deployment) return res.status(404).json({ msg: 'Deployment not found' });
    res.json(deployment);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateDeployment = async (req: Request, res: Response) => {
  try {
    const deployment = await deploymentService.updateDeployment(req.params.id, req.body);
    if (!deployment) return res.status(404).json({ msg: 'Deployment not found' });
    res.json(deployment);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteDeployment = async (req: Request, res: Response) => {
  try {
    const deployment = await deploymentService.deleteDeployment(req.params.id);
    if (!deployment) return res.status(404).json({ msg: 'Deployment not found' });
    res.json({ msg: 'Deployment removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateDeploymentStatus = async (req: Request, res: Response) => {
  try {
    const deployment = await deploymentService.updateDeploymentStatus(req.params.id, req.body.status);
    if (!deployment) return res.status(404).json({ msg: 'Deployment not found' });
    res.json(deployment);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};