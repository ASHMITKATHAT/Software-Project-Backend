import mongoose, { Schema, Document } from 'mongoose';

export interface IDeployment extends Document {
  projectId: mongoose.Types.ObjectId;
  releaseId?: mongoose.Types.ObjectId;
  environmentId: mongoose.Types.ObjectId;
  version: string;
  status: 'pending' | 'in_progress' | 'success' | 'failed' | 'rolled_back';
  buildId?: string;
  commitSha?: string;
  branch: string;
  deployedBy: mongoose.Types.ObjectId;
  rollbackVersion?: string;
  logs: string[];
  duration: number;
  artifacts: string[];
  createdAt: Date;
  updatedAt: Date;
}

const DeploymentSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  releaseId: { type: Schema.Types.ObjectId, ref: 'Release' },
  environmentId: { type: Schema.Types.ObjectId, ref: 'Environment', required: true },
  version: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'success', 'failed', 'rolled_back'], default: 'pending' },
  buildId: { type: String },
  commitSha: { type: String },
  branch: { type: String, required: true },
  deployedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rollbackVersion: { type: String },
  logs: [{ type: String }],
  duration: { type: Number, default: 0 },
  artifacts: [{ type: String }],
}, { timestamps: true });

DeploymentSchema.index({ projectId: 1, status: 1 });
DeploymentSchema.index({ environmentId: 1, createdAt: -1 });

export default mongoose.model<IDeployment>('Deployment', DeploymentSchema);
