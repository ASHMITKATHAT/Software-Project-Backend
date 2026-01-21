import { Request, Response } from 'express';
import * as resourceService from '../services/resourceService';
import { logger } from '../config/logger';

export const createResource = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const resource = await resourceService.createResource(data, (req as any).user.id);
    res.status(201).json(resource);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await resourceService.getAllResources(req.params.projectId);
    res.json(resources);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getResourceById = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.getResourceById(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    res.json(resource);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.updateResource(req.params.id, req.body);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    res.json(resource);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.deleteResource(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    res.json({ msg: 'Resource removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const allocateResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.allocateResource(req.params.id, req.body.userId);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    res.json(resource);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deallocateResource = async (req: Request, res: Response) => {
  try {
    const resource = await resourceService.deallocateResource(req.params.id);
    if (!resource) return res.status(404).json({ msg: 'Resource not found' });
    res.json(resource);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};