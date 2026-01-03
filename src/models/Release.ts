import mongoose, { Schema, Document } from 'mongoose';

export interface IRelease extends Document {
  projectId: mongoose.Types.ObjectId;
  version: string;
  name: string;
  description: string;
  status: 'planned' | 'in_progress' | 'released' | 'rolled_back' | 'cancelled';
  releaseDate?: Date;
  sprintIds: mongoose.Types.ObjectId[];
  issueIds: mongoose.Types.ObjectId[];
  changelogIds?: mongoose.Types.ObjectId[];
  releaseNotes: string;
  createdBy: mongoose.Types.ObjectId;
  approvedBy?: mongoose.Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ReleaseSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  version: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxlength: 2000 },
  status: { type: String, enum: ['planned', 'in_progress', 'released', 'rolled_back', 'cancelled'], default: 'planned' },
  releaseDate: { type: Date },
  sprintIds: [{ type: Schema.Types.ObjectId, ref: 'Sprint' }],
  issueIds: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  changelogIds: [{ type: Schema.Types.ObjectId, ref: 'Changelog' }],
  releaseNotes: { type: String, maxlength: 10000 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: String, trim: true }],
}, { timestamps: true });

ReleaseSchema.index({ projectId: 1, version: 1 }, { unique: true });
ReleaseSchema.index({ projectId: 1, status: 1 });

export default mongoose.model<IRelease>('Release', ReleaseSchema);
