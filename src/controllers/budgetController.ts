import { Request, Response } from 'express';
import * as budgetService from '../services/budgetService';
import { logger } from '../config/logger';

export const createBudget = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body, projectId: req.params.projectId };
    const budget = await budgetService.createBudget(data);
    res.status(201).json(budget);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await budgetService.getAllBudgets(req.params.projectId);
    res.json(budgets);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const budget = await budgetService.getBudgetById(req.params.id);
    if (!budget) return res.status(404).json({ msg: 'Budget not found' });
    res.json(budget);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateBudget = async (req: Request, res: Response) => {
  try {
    const budget = await budgetService.updateBudget(req.params.id, req.body);
    if (!budget) return res.status(404).json({ msg: 'Budget not found' });
    res.json(budget);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const budget = await budgetService.deleteBudget(req.params.id);
    if (!budget) return res.status(404).json({ msg: 'Budget not found' });
    res.json({ msg: 'Budget removed' });
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const budget = await budgetService.addTransaction(req.params.id, req.body);
    if (!budget) return res.status(404).json({ msg: 'Budget not found' });
    res.json(budget);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getBudgetSummary = async (req: Request, res: Response) => {
  try {
    const summary = await budgetService.getBudgetSummary(req.params.projectId);
    res.json(summary);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};