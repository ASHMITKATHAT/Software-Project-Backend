import Changelog from '../models/Changelog';
import { logger } from '../config/logger';

export const getAllChangelogs = async (projectId: string) => {
  try {
    return await Changelog.find({ projectId }).sort({ publishedAt: -1 }).populate('entries.author contributors', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching changelogs: ${error.message}`);
    throw error;
  }
};

export const getChangelogById = async (id: string) => {
  try {
    return await Changelog.findById(id).populate('entries.author contributors', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching changelog: ${error.message}`);
    throw error;
  }
};

export const createChangelog = async (data: any, userId: string) => {
  try {
    const entries = data.entries.map((e: any) => ({ ...e, author: userId }));
    const changelog = new Changelog({ ...data, entries });
    return await changelog.save();
  } catch (error: any) {
    logger.error(`Error creating changelog: ${error.message}`);
    throw error;
  }
};

export const updateChangelog = async (id: string, data: any) => {
  try {
    return await Changelog.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating changelog: ${error.message}`);
    throw error;
  }
};

export const deleteChangelog = async (id: string) => {
  try {
    return await Changelog.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting changelog: ${error.message}`);
    throw error;
  }
};

export const publishChangelog = async (id: string) => {
  try {
    return await Changelog.findByIdAndUpdate(id, { publishedAt: new Date() }, { new: true });
  } catch (error: any) {
    logger.error(`Error publishing changelog: ${error.message}`);
    throw error;
  }
};