import mongoose, { Schema, Document } from 'mongoose';

export interface ISprint extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  goal: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate: Date;
  capacity: number;
  issueIds: mongoose.Types.ObjectId[];
  backlogIds: mongoose.Types.ObjectId[];
  velocity: number;
  retrospective: string;
  createdAt: Date;
  updatedAt: Date;
}

const SprintSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true, trim: true },
  goal: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['planning', 'active', 'completed', 'cancelled'], default: 'planning' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  capacity: { type: Number, default: 0 },
  issueIds: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  backlogIds: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  velocity: { type: Number, default: 0 },
  retrospective: { type: String, maxlength: 5000 },
}, { timestamps: true });

SprintSchema.index({ projectId: 1, status: 1 });
SprintSchema.index({ projectId: 1, startDate: 1, endDate: 1 });

export default mongoose.model<ISprint>('Sprint', SprintSchema);
