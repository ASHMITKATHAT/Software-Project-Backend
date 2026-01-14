import CodeReview from '../models/CodeReview';
import { logger } from '../config/logger';

export const getAllCodeReviews = async (projectId: string) => {
  try {
    return await CodeReview.find({ projectId }).sort({ createdAt: -1 }).populate('author reviewers.userId', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching code reviews: ${error.message}`);
    throw error;
  }
};

export const getCodeReviewById = async (id: string) => {
  try {
    return await CodeReview.findById(id).populate('author reviewers.userId comments.author', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching code review: ${error.message}`);
    throw error;
  }
};

export const createCodeReview = async (data: any, userId: string) => {
  try {
    const reviewers = (data.reviewers || []).map((r: string) => ({ userId: r, status: 'pending' }));
    const codeReview = new CodeReview({ ...data, author: userId, reviewers });
    return await codeReview.save();
  } catch (error: any) {
    logger.error(`Error creating code review: ${error.message}`);
    throw error;
  }
};

export const updateCodeReview = async (id: string, data: any) => {
  try {
    return await CodeReview.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error: any) {
    logger.error(`Error updating code review: ${error.message}`);
    throw error;
  }
};

export const deleteCodeReview = async (id: string) => {
  try {
    return await CodeReview.findByIdAndDelete(id);
  } catch (error: any) {
    logger.error(`Error deleting code review: ${error.message}`);
    throw error;
  }
};

export const addCodeReviewComment = async (id: string, comment: any) => {
  try {
    return await CodeReview.findByIdAndUpdate(id, { \$push: { comments: comment } }, { new: true });
  } catch (error: any) {
    logger.error(`Error adding review comment: ${error.message}`);
    throw error;
  }
};

export const updateReviewerStatus = async (id: string, userId: string, status: string) => {
  try {
    return await CodeReview.findOneAndUpdate(
      { _id: id, 'reviewers.userId': userId },
      { \$set: { 'reviewers.\$.status': status } },
      { new: true }
    );
  } catch (error: any) {
    logger.error(`Error updating reviewer status: ${error.message}`);
    throw error;
  }
};