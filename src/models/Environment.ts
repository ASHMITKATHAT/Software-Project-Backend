import mongoose, { Schema, Document } from 'mongoose';

export interface IEnvironment extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing' | 'qa';
  baseUrl: string;
  apiKey?: string;
  variables: Record<string, string>;
  isActive: boolean;
  config: Record<string, any>;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EnvironmentSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['development', 'staging', 'production', 'testing', 'qa'], required: true },
  baseUrl: { type: String, required: true },
  apiKey: { type: String },
  variables: { type: Map, of: String, default: {} },
  isActive: { type: Boolean, default: true },
  config: { type: Schema.Types.Mixed, default: {} },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

EnvironmentSchema.index({ projectId: 1, type: 1 });

export default mongoose.model<IEnvironment>('Environment', EnvironmentSchema);
