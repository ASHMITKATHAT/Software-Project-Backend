import Environment from '../models/Environment';
import { logger } from '../config/logger';

export const getAllEnvironments = async (projectId: string) => {
  try {
    return await Environment.find({ projectId });
  } catch (error: any) {
    logger.error(`Error fetching environments: ${error.message}`);
    throw error;
  }
};

export const getEnvironmentById = async (id: string) => {
  try {
    return await Environment.findById(id);
  } catch (error: any) {
    logger.error(`Error fetching environment: ${error.message}`);
    throw error;
  }
};

export const createEnvironment = async (data: any, userId: string) => {
  try {
    const env = new Environment({ ...data, createdBy: userId });
    return await env.save();
  } catch (error: any) {
    logger.error(`Error creating environment: ${error.message}`);
    throw error;
  }
};

export const updateEnvironment = async (id: string, data: any) => {
  try {
    return await Environment.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating environment: ${error.message}`);
    throw error;
  }
};

export const deleteEnvironment = async (id: string) => {
  try {
    return await Environment.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting environment: ${error.message}`);
    throw error;
  }
};

export const toggleEnvironmentActive = async (id: string) => {
  try {
    const env = await Environment.findById(id);
    if (!env) return null;
    env.isActive = !env.isActive;
    return await env.save();
  } catch (error: any) {
    logger.error(`Error toggling environment: ${error.message}`);
    throw error;
  }
};
// Added health check endpoint
