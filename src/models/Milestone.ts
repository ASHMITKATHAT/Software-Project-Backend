import mongoose, { Schema, Document } from 'mongoose';

export interface IMilestone extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  dueDate: Date;
  completionDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
  progress: number;
  deliverables: string[];
  dependencies: mongoose.Types.ObjectId[];
  assignedTo?: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MilestoneSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 3000 },
  dueDate: { type: Date, required: true },
  completionDate: { type: Date },
  status: { type: String, enum: ['pending', 'in_progress', 'completed', 'overdue', 'cancelled'], default: 'pending' },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  deliverables: [{ type: String }],
  dependencies: [{ type: Schema.Types.ObjectId, ref: 'Milestone' }],
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String, trim: true }],
}, { timestamps: true });

MilestoneSchema.index({ projectId: 1, status: 1 });
MilestoneSchema.index({ projectId: 1, dueDate: 1 });

export default mongoose.model<IMilestone>('Milestone', MilestoneSchema);
