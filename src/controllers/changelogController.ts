import { Request, Response } from 'express';
import * as changelogService from '../services/changelogService';
import { logger } from '../config/logger';

export const createChangelog = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId, releaseId: req.params.releaseId };
    const changelog = await changelogService.createChangelog(data, (req as any).user.id);
    res.status(201).json(changelog);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getChangelogs = async (req: Request, res: Response) => {
  try {
    const changelogs = await changelogService.getAllChangelogs(req.params.projectId);
    res.json(changelogs);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getChangelogById = async (req: Request, res: Response) => {
  try {
    const changelog = await changelogService.getChangelogById(req.params.id);
    if (!changelog) return res.status(404).json({ msg: 'Changelog not found' });
    res.json(changelog);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateChangelog = async (req: Request, res: Response) => {
  try {
    const changelog = await changelogService.updateChangelog(req.params.id, req.body);
    if (!changelog) return res.status(404).json({ msg: 'Changelog not found' });
    res.json(changelog);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteChangelog = async (req: Request, res: Response) => {
  try {
    const changelog = await changelogService.deleteChangelog(req.params.id);
    if (!changelog) return res.status(404).json({ msg: 'Changelog not found' });
    res.json({ msg: 'Changelog removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const publishChangelog = async (req: Request, res: Response) => {
  try {
    const changelog = await changelogService.publishChangelog(req.params.id);
    if (!changelog) return res.status(404).json({ msg: 'Changelog not found' });
    res.json(changelog);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};