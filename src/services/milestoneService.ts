import Milestone from '../models/Milestone';
import { logger } from '../config/logger';

export const getAllMilestones = async (projectId: string) => {
  try {
    return await Milestone.find({ projectId }).sort({ dueDate: 1 }).populate('assignedTo createdBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching milestones: ${error.message}`);
    throw error;
  }
};

export const getMilestoneById = async (id: string) => {
  try {
    return await Milestone.findById(id).populate('assignedTo createdBy dependencies', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching milestone: ${error.message}`);
    throw error;
  }
};

export const createMilestone = async (data: any, userId: string) => {
  try {
    const milestone = new Milestone({ ...data, createdBy: userId });
    return await milestone.save();
  } catch (error: any) {
    logger.error(`Error creating milestone: ${error.message}`);
    throw error;
  }
};

export const updateMilestone = async (id: string, data: any) => {
  try {
    return await Milestone.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating milestone: ${error.message}`);
    throw error;
  }
};

export const deleteMilestone = async (id: string) => {
  try {
    return await Milestone.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting milestone: ${error.message}`);
    throw error;
  }
};

export const updateMilestoneProgress = async (id: string, progress: number) => {
  try {
    const data: any = { progress };
    if (progress >= 100) data.status = 'completed';
    return await Milestone.findByIdAndUpdate(id, data, { new: true });
  } catch (error: any) {
    logger.error(`Error updating milestone progress: ${error.message}`);
    throw error;
  }
};