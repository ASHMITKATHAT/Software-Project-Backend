import { Request, Response } from 'express';
import * as releaseService from '../services/releaseService';
import { logger } from '../config/logger';

export const createRelease = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const release = await releaseService.createRelease(data, (req as any).user.id);
    res.status(201).json(release);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getReleases = async (req: Request, res: Response) => {
  try {
    const releases = await releaseService.getAllReleases(req.params.projectId);
    res.json(releases);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getReleaseById = async (req: Request, res: Response) => {
  try {
    const release = await releaseService.getReleaseById(req.params.id);
    if (!release) return res.status(404).json({ msg: 'Release not found' });
    res.json(release);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateRelease = async (req: Request, res: Response) => {
  try {
    const release = await releaseService.updateRelease(req.params.id, req.body);
    if (!release) return res.status(404).json({ msg: 'Release not found' });
    res.json(release);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteRelease = async (req: Request, res: Response) => {
  try {
    const release = await releaseService.deleteRelease(req.params.id);
    if (!release) return res.status(404).json({ msg: 'Release not found' });
    res.json({ msg: 'Release removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const publishRelease = async (req: Request, res: Response) => {
  try {
    const release = await releaseService.releaseRelease(req.params.id, (req as any).user.id);
    if (!release) return res.status(404).json({ msg: 'Release not found' });
    res.json(release);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getReleaseChangelogs = async (req: Request, res: Response) => {
  try {
    const changelogs = await releaseService.getReleaseChangelogs(req.params.id);
    res.json(changelogs);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};