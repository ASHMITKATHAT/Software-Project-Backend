import { Request, Response } from 'express';
import * as issueService from '../services/issueService';
import { logger } from '../config/logger';

export const createIssue = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const issue = await issueService.createIssue(data, (req as any).user.id);
    res.status(201).json(issue);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getIssues = async (req: Request, res: Response) => {
  try {
    const issues = await issueService.getAllIssues(req.params.projectId, req.query);
    res.json(issues);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.getIssueById(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });
    res.json(issue);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.updateIssue(req.params.id, req.body);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });
    res.json(issue);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issue = await issueService.deleteIssue(req.params.id);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });
    res.json({ msg: 'Issue removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = { author: (req as any).user.id, text: req.body.text };
    const issue = await issueService.addIssueComment(req.params.id, comment);
    if (!issue) return res.status(404).json({ msg: 'Issue not found' });
    res.json(issue);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};