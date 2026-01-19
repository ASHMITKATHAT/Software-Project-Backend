import { Request, Response } from 'express';
import * as requirementService from '../services/requirementService';
import { logger } from '../config/logger';

export const createRequirement = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const requirement = await requirementService.createRequirement(data, (req as any).user.id);
    res.status(201).json(requirement);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getRequirements = async (req: Request, res: Response) => {
  try {
    const requirements = await requirementService.getAllRequirements(req.params.projectId);
    res.json(requirements);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getRequirementById = async (req: Request, res: Response) => {
  try {
    const requirement = await requirementService.getRequirementById(req.params.id);
    if (!requirement) return res.status(404).json({ msg: 'Requirement not found' });
    res.json(requirement);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateRequirement = async (req: Request, res: Response) => {
  try {
    const requirement = await requirementService.updateRequirement(req.params.id, req.body);
    if (!requirement) return res.status(404).json({ msg: 'Requirement not found' });
    res.json(requirement);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteRequirement = async (req: Request, res: Response) => {
  try {
    const requirement = await requirementService.deleteRequirement(req.params.id);
    if (!requirement) return res.status(404).json({ msg: 'Requirement not found' });
    res.json({ msg: 'Requirement removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};