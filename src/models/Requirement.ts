import mongoose, { Schema, Document } from 'mongoose';

export interface IRequirement extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'functional' | 'non_functional' | 'business' | 'technical' | 'user_story';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'reviewed' | 'approved' | 'implemented' | 'verified' | 'rejected';
  acceptanceCriteria: string[];
  estimatedHours: number;
  actualHours: number;
  version: number;
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  parentRequirement?: mongoose.Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RequirementSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 5000 },
  type: { type: String, enum: ['functional', 'non_functional', 'business', 'technical', 'user_story'], default: 'functional' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  status: { type: String, enum: ['draft', 'reviewed', 'approved', 'implemented', 'verified', 'rejected'], default: 'draft' },
  acceptanceCriteria: [{ type: String }],
  estimatedHours: { type: Number, default: 0 },
  actualHours: { type: Number, default: 0 },
  version: { type: Number, default: 1 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  parentRequirement: { type: Schema.Types.ObjectId, ref: 'Requirement' },
  tags: [{ type: String, trim: true }],
}, { timestamps: true });

RequirementSchema.index({ projectId: 1, status: 1 });
RequirementSchema.index({ projectId: 1, type: 1 });

export default mongoose.model<IRequirement>('Requirement', RequirementSchema);
