import Release from '../models/Release';
import Changelog from '../models/Changelog';
import { logger } from '../config/logger';

export const getAllReleases = async (projectId: string) => {
  try {
    return await Release.find({ projectId }).sort({ createdAt: -1 }).populate('createdBy approvedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching releases: ${error.message}`);
    throw error;
  }
};

export const getReleaseById = async (id: string) => {
  try {
    return await Release.findById(id).populate('createdBy approvedBy sprintIds issueIds', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching release: ${error.message}`);
    throw error;
  }
};

export const createRelease = async (data: any, userId: string) => {
  try {
    const release = new Release({ ...data, createdBy: userId });
    return await release.save();
  } catch (error: any) {
    logger.error(`Error creating release: ${error.message}`);
    throw error;
  }
};

export const updateRelease = async (id: string, data: any) => {
  try {
    return await Release.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating release: ${error.message}`);
    throw error;
  }
};

export const deleteRelease = async (id: string) => {
  try {
    return await Release.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting release: ${error.message}`);
    throw error;
  }
};

export const releaseRelease = async (id: string, userId: string) => {
  try {
    return await Release.findByIdAndUpdate(id, { status: 'released', releaseDate: new Date(), approvedBy: userId }, { new: true });
  } catch (error: any) {
    logger.error(`Error releasing: ${error.message}`);
    throw error;
  }
};

export const getReleaseChangelogs = async (releaseId: string) => {
  try {
    return await Changelog.find({ releaseId }).populate('entries.author contributors', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching changelogs: ${error.message}`);
    throw error;
  }
};
// Added rollback support
