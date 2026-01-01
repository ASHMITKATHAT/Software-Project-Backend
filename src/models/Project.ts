import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: Date;
  endDate?: Date;
  createdBy: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  members: Array<{ userId: mongoose.Types.ObjectId; role: string }>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['planning', 'active', 'on_hold', 'completed', 'archived'], default: 'planning' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, role: { type: String, default: 'member' } }],
  tags: [{ type: String, trim: true }],
}, { timestamps: true });

ProjectSchema.index({ status: 1 });
ProjectSchema.index({ createdBy: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
