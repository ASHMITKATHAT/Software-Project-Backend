import { Request, Response } from 'express';
import * as codeReviewService from '../services/codeReviewService';
import { logger } from '../config/logger';

export const createCodeReview = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const codeReview = await codeReviewService.createCodeReview(data, (req as any).user.id);
    res.status(201).json(codeReview);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getCodeReviews = async (req: Request, res: Response) => {
  try {
    const codeReviews = await codeReviewService.getAllCodeReviews(req.params.projectId);
    res.json(codeReviews);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getCodeReviewById = async (req: Request, res: Response) => {
  try {
    const codeReview = await codeReviewService.getCodeReviewById(req.params.id);
    if (!codeReview) return res.status(404).json({ msg: 'Code review not found' });
    res.json(codeReview);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateCodeReview = async (req: Request, res: Response) => {
  try {
    const codeReview = await codeReviewService.updateCodeReview(req.params.id, req.body);
    if (!codeReview) return res.status(404).json({ msg: 'Code review not found' });
    res.json(codeReview);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteCodeReview = async (req: Request, res: Response) => {
  try {
    const codeReview = await codeReviewService.deleteCodeReview(req.params.id);
    if (!codeReview) return res.status(404).json({ msg: 'Code review not found' });
    res.json({ msg: 'Code review removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const comment = { author: (req as any).user.id, file: req.body.file, line: req.body.line, text: req.body.text };
    const codeReview = await codeReviewService.addCodeReviewComment(req.params.id, comment);
    if (!codeReview) return res.status(404).json({ msg: 'Code review not found' });
    res.json(codeReview);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateReviewerStatus = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;
    const codeReview = await codeReviewService.updateReviewerStatus(req.params.id, userId, status);
    if (!codeReview) return res.status(404).json({ msg: 'Code review not found' });
    res.json(codeReview);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};