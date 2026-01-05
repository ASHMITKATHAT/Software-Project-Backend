import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  projectId: mongoose.Types.ObjectId;
  type: 'error' | 'warning' | 'info' | 'critical' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  source: string;
  metric?: string;
  value?: number;
  threshold?: number;
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  acknowledgedBy?: mongoose.Types.ObjectId;
  acknowledgedAt?: Date;
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const AlertSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  type: { type: String, enum: ['error', 'warning', 'info', 'critical', 'performance'], required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, maxlength: 5000 },
  source: { type: String, required: true },
  metric: { type: String },
  value: { type: Number },
  threshold: { type: Number },
  status: { type: String, enum: ['active', 'acknowledged', 'resolved', 'dismissed'], default: 'active' },
  acknowledgedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  acknowledgedAt: { type: Date },
  resolvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  resolvedAt: { type: Date },
  metadata: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

AlertSchema.index({ projectId: 1, status: 1, severity: 1 });
AlertSchema.index({ projectId: 1, createdAt: -1 });
AlertSchema.index({ source: 1, status: 1 });

export default mongoose.model<IAlert>('Alert', AlertSchema);
