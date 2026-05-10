import Requirement from '../models/Requirement';
import { logger } from '../config/logger';

export const getAllRequirements = async (projectId: string) => {
  try {
    return await Requirement.find({ projectId }).populate('createdBy assignedTo', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching requirements: ${error.message}`);
    throw error;
  }
};

export const getRequirementById = async (id: string) => {
  try {
    return await Requirement.findById(id).populate('createdBy assignedTo', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching requirement: ${error.message}`);
    throw error;
  }
};

export const createRequirement = async (data: any, userId: string) => {
  try {
    const requirement = new Requirement({ ...data, createdBy: userId });
    return await requirement.save();
  } catch (error: any) {
    logger.error(`Error creating requirement: ${error.message}`);
    throw error;
  }
};

export const updateRequirement = async (id: string, data: any) => {
  try {
    return await Requirement.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating requirement: ${error.message}`);
    throw error;
  }
};

export const deleteRequirement = async (id: string) => {
  try {
    return await Requirement.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting requirement: ${error.message}`);
    throw error;
  }
};
// Added bulk operations
