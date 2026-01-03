import mongoose, { Schema, Document } from 'mongoose';

export interface IChangelog extends Document {
  releaseId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  version: string;
  entries: Array<{ type: string; description: string; issueIds: mongoose.Types.ObjectId[]; author: mongoose.Types.ObjectId }>;
  summary: string;
  contributors: mongoose.Types.ObjectId[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ChangelogEntrySchema = new Schema({
  type: { type: String, enum: ['added', 'changed', 'fixed', 'deprecated', 'removed', 'security', 'performance'], required: true },
  description: { type: String, required: true, maxlength: 1000 },
  issueIds: [{ type: Schema.Types.ObjectId, ref: 'Issue' }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { _id: true });

const ChangelogSchema: Schema = new Schema({
  releaseId: { type: Schema.Types.ObjectId, ref: 'Release', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  version: { type: String, required: true, trim: true },
  entries: [ChangelogEntrySchema],
  summary: { type: String, maxlength: 5000 },
  contributors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  publishedAt: { type: Date },
}, { timestamps: true });

ChangelogSchema.index({ releaseId: 1 });
ChangelogSchema.index({ projectId: 1, version: 1 });

export default mongoose.model<IChangelog>('Changelog', ChangelogSchema);
