import Sprint from '../models/Sprint';
import { logger } from '../config/logger';

export const getAllSprints = async (projectId: string) => {
  try {
    return await Sprint.find({ projectId }).sort({ startDate: -1 }).populate('issueIds backlogIds');
  } catch (error: any) {
    logger.error(`Error fetching sprints: ${error.message}`);
    throw error;
  }
};

export const getSprintById = async (id: string) => {
  try {
    return await Sprint.findById(id).populate('issueIds backlogIds');
  } catch (error: any) {
    logger.error(`Error fetching sprint: ${error.message}`);
    throw error;
  }
};

export const createSprint = async (data: any) => {
  try {
    const sprint = new Sprint(data);
    return await sprint.save();
  } catch (error: any) {
    logger.error(`Error creating sprint: ${error.message}`);
    throw error;
  }
};

export const updateSprint = async (id: string, data: any) => {
  try {
    return await Sprint.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating sprint: ${error.message}`);
    throw error;
  }
};

export const deleteSprint = async (id: string) => {
  try {
    return await Sprint.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting sprint: ${error.message}`);
    throw error;
  }
};

export const startSprint = async (id: string) => {
  try {
    return await Sprint.findByIdAndUpdate(id, { status: 'active' }, { new: true });
  } catch (error: any) {
    logger.error(`Error starting sprint: ${error.message}`);
    throw error;
  }
};

export const completeSprint = async (id: string) => {
  try {
    return await Sprint.findByIdAndUpdate(id, { status: 'completed' }, { new: true });
  } catch (error: any) {
    logger.error(`Error completing sprint: ${error.message}`);
    throw error;
  }
};