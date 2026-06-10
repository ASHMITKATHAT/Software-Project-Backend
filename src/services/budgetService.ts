import Budget from '../models/Budget';
import { logger } from '../config/logger';

export const getAllBudgets = async (projectId: string) => {
  try {
    return await Budget.find({ projectId }).populate('approvedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching budgets: ${error.message}`);
    throw error;
  }
};

export const getBudgetById = async (id: string) => {
  try {
    return await Budget.findById(id).populate('approvedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching budget: ${error.message}`);
    throw error;
  }
};

export const createBudget = async (data: any) => {
  try {
    const budget = new Budget(data);
    return await budget.save();
  } catch (error: any) {
    logger.error(`Error creating budget: ${error.message}`);
    throw error;
  }
};

export const updateBudget = async (id: string, data: any) => {
  try {
    return await Budget.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating budget: ${error.message}`);
    throw error;
  }
};

export const deleteBudget = async (id: string) => {
  try {
    return await Budget.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting budget: ${error.message}`);
    throw error;
  }
};

export const addTransaction = async (id: string, transaction: any) => {
  try {
    const budget = await Budget.findById(id);
    if (!budget) return null;
    budget.transactions.push(transaction);
    if (transaction.type === 'expense') {
      budget.spentAmount += Math.abs(transaction.amount);
    }
    return await budget.save();
  } catch (error: any) {
    logger.error(`Error adding transaction: ${error.message}`);
    throw error;
  }
};

export const getBudgetSummary = async (projectId: string) => {
  try {
    const budgets = await Budget.find({ projectId });
    const total = budgets.reduce((sum, b) => sum + b.totalBudget, 0);
    const spent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);
    return { totalBudget: total, spentAmount: spent, remaining: total - spent };
  } catch (error: any) {
    logger.error(`Error fetching budget summary: ${error.message}`);
    throw error;
  }
};
// Added budget forecasting
