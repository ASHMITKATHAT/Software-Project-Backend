import Project from '../models/Project';
import { logger } from '../config/logger';

export const getAllProjects = async () => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    return projects;
  } catch (error: any) {
    logger.error(`Error fetching projects: ${error.message}`);
    throw error;
  }
};

export const getProjectByIdService = async (id: string) => {
  try {
    const project = await Project.findById(id).populate('createdBy', 'username');
    return project;
  } catch (error: any) {
    logger.error(`Error fetching project by id: ${error.message}`);
    throw error;
  }
};

export const createProjectService = async (projectData: any, userId: string) => {
  try {
    const newProject = new Project({ ...projectData, createdBy: userId });
    await newProject.save();
    return newProject;
  } catch (error: any) {
    logger.error(`Error creating project: ${error.message}`);
    throw error;
  }
};

export const updateProjectService = async (id: string, projectData: any, userId: string) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, { ...projectData, updatedBy: userId }, { new: true });
    return updatedProject;
  } catch (error: any) {
    logger.error(`Error updating project: ${error.message}`);
    throw error;
  }
};

export const deleteProjectService = async (id: string) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    return deletedProject;
  } catch (error: any) {
    logger.error(`Error deleting project: ${error.message}`);
    throw error;
  }
};

// Added date range filtering
