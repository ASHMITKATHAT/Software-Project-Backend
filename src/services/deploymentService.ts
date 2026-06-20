import Deployment from '../models/Deployment';
import { logger } from '../config/logger';

export const getAllDeployments = async (projectId: string) => {
  try {
    return await Deployment.find({ projectId }).sort({ createdAt: -1 }).populate('deployedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching deployments: ${error.message}`);
    throw error;
  }
};

export const getDeploymentById = async (id: string) => {
  try {
    return await Deployment.findById(id).populate('deployedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching deployment: ${error.message}`);
    throw error;
  }
};

export const createDeployment = async (data: any, userId: string) => {
  try {
    const deployment = new Deployment({ ...data, deployedBy: userId });
    return await deployment.save();
  } catch (error: any) {
    logger.error(`Error creating deployment: ${error.message}`);
    throw error;
  }
};

export const updateDeployment = async (id: string, data: any) => {
  try {
    return await Deployment.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating deployment: ${error.message}`);
    throw error;
  }
};

export const deleteDeployment = async (id: string) => {
  try {
    return await Deployment.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting deployment: ${error.message}`);
    throw error;
  }
};

export const updateDeploymentStatus = async (id: string, status: string) => {
  try {
    return await Deployment.findByIdAndUpdate(id, { status }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating deployment status: ${error.message}`);
    throw error;
  }
};
// Added deployment hooks
