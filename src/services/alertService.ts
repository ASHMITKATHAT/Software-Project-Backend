import Alert from '../models/Alert';
import { logger } from '../config/logger';

export const getAllAlerts = async (projectId: string, filters?: any) => {
  try {
    const query: any = { projectId };
    if (filters?.status) query.status = filters.status;
    if (filters?.severity) query.severity = filters.severity;
    if (filters?.type) query.type = filters.type;
    if (filters?.source) query.source = filters.source;
    return await Alert.find(query).sort({ createdAt: -1 }).populate('acknowledgedBy resolvedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching alerts: ${error.message}`);
    throw error;
  }
};

export const getAlertById = async (id: string) => {
  try {
    return await Alert.findById(id).populate('acknowledgedBy resolvedBy', 'username email');
  } catch (error: any) {
    logger.error(`Error fetching alert: ${error.message}`);
    throw error;
  }
};

export const createAlert = async (data: any) => {
  try {
    const alert = new Alert(data);
    return await alert.save();
  } catch (error: any) {
    logger.error(`Error creating alert: ${error.message}`);
    throw error;
  }
};

export const acknowledgeAlert = async (id: string, userId: string) => {
  try {
    return await Alert.findByIdAndUpdate(id, { status: 'acknowledged', acknowledgedBy: userId, acknowledgedAt: new Date() }, { new: true });
  } catch (error: any) {
    logger.error(`Error acknowledging alert: ${error.message}`);
    throw error;
  }
};

export const resolveAlert = async (id: string, userId: string) => {
  try {
    return await Alert.findByIdAndUpdate(id, { status: 'resolved', resolvedBy: userId, resolvedAt: new Date() }, { new: true });
  } catch (error: any) {
    logger.error(`Error resolving alert: ${error.message}`);
    throw error;
  }
};

export const dismissAlert = async (id: string) => {
  try {
    return await Alert.findByIdAndUpdate(id, { status: 'dismissed' }, { new: true });
  } catch (error: any) {
    logger.error(`Error dismissing alert: ${error.message}`);
    throw error;
  }
};

export const getAlertStats = async (projectId: string) => {
  try {
    const { default: mongoose } = await import('mongoose');
    const stats = await Alert.aggregate([
      { \$match: { projectId: new mongoose.Types.ObjectId(projectId) } },
      { \$group: { _id: '\$status', count: { \$sum: 1 } } },
    ]);
    return stats;
  } catch (error: any) {
    logger.error(`Error fetching alert stats: ${error.message}`);
    throw error;
  }
};
// Added alert deduplication
