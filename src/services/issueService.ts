import Issue from '../models/Issue';
import { logger } from '../config/logger';

export const getAllIssues = async (projectId: string, filters?: any) => {
  try {
    const query: any = { projectId };
    if (filters?.status) query.status = filters.status;
    if (filters?.type) query.type = filters.type;
    if (filters?.severity) query.severity = filters.severity;
    if (filters?.assignee) query.assignee = filters.assignee;
    if (filters?.priority) query.priority = filters.priority;
    return await Issue.find(query).populate('assignee reporter', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching issues: ${error.message}`);
    throw error;
  }
};

export const getIssueById = async (id: string) => {
  try {
    return await Issue.findById(id).populate('assignee reporter comments.author', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching issue: ${error.message}`);
    throw error;
  }
};

export const createIssue = async (data: any, userId: string) => {
  try {
    const issue = new Issue({ ...data, reporter: userId });
    return await issue.save();
  } catch (error: any) {
    logger.error(`Error creating issue: ${error.message}`);
    throw error;
  }
};

export const updateIssue = async (id: string, data: any) => {
  try {
    return await Issue.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating issue: ${error.message}`);
    throw error;
  }
};

export const deleteIssue = async (id: string) => {
  try {
    return await Issue.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting issue: ${error.message}`);
    throw error;
  }
};

export const addIssueComment = async (issueId: string, comment: { author: string; text: string }) => {
  try {
    return await Issue.findByIdAndUpdate(issueId, { \$push: { comments: comment } }, { new: true });
  } catch (error: any) {
    logger.error(`Error adding comment: ${error.message}`);
    throw error;
  }
};