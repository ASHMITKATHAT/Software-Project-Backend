import Resource from '../models/Resource';
import { logger } from '../config/logger';

export const getAllResources = async (projectId: string) => {
  try {
    return await Resource.find({ projectId }).populate('assignedTo', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching resources: ${error.message}`);
    throw error;
  }
};

export const getResourceById = async (id: string) => {
  try {
    return await Resource.findById(id).populate('assignedTo', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching resource: ${error.message}`);
    throw error;
  }
};

export const createResource = async (data: any, userId: string) => {
  try {
    const resource = new Resource({ ...data, createdBy: userId });
    return await resource.save();
  } catch (error: any) {
    logger.error(`Error creating resource: ${error.message}`);
    throw error;
  }
};

export const updateResource = async (id: string, data: any) => {
  try {
    return await Resource.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating resource: ${error.message}`);
    throw error;
  }
};

export const deleteResource = async (id: string) => {
  try {
    return await Resource.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting resource: ${error.message}`);
    throw error;
  }
};

export const allocateResource = async (id: string, userId: string) => {
  try {
    return await Resource.findByIdAndUpdate(id, { status: 'allocated', assignedTo: userId, allocatedAt: new Date() }, { new: true });
  } catch (error: any) {
    logger.error(`Error allocating resource: ${error.message}`);
    throw error;
  }
};

export const deallocateResource = async (id: string) => {
  try {
    return await Resource.findByIdAndUpdate(id, { status: 'available', assignedTo: null, deallocatedAt: new Date() }, { new: true });
  } catch (error: any) {
    logger.error(`Error deallocating resource: ${error.message}`);
    throw error;
  }
};
// Added utilization calculation
