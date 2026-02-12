import { Request, Response } from 'express';
import Project from '../models/Project';
import { logger } from '../config/logger';

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({
      name,
      description,
      createdBy: (req as any).user.id // Assuming auth middleware adds user info
    });
    const project = await newProject.save();
    res.json(project);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username');
    res.json(projects);
  } catch (err: any) {
    logger.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id).populate('createdBy', 'username');
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err: any) {
    logger.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const project = await Project.findByIdAndUpdate(req.params.id, {
      name,
      description,
      updatedBy: (req as any).user.id
    }, { new: true });

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err: any) {
    logger.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json({ msg: 'Project removed' });
  } catch (err: any) {
    logger.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Updated with status calculation fix
