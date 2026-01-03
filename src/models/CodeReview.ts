import mongoose, { Schema, Document } from 'mongoose';

export interface ICodeReview extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  pullRequestUrl?: string;
  branch: string;
  status: 'pending' | 'in_review' | 'approved' | 'changes_requested' | 'closed';
  reviewers: Array<{ userId: mongoose.Types.ObjectId; status: string; comments: string }>;
  author: mongoose.Types.ObjectId;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  comments: Array<{ author: mongoose.Types.ObjectId; file: string; line: number; text: string; resolved: boolean }>;
  mergeCommit?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CodeReviewSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxlength: 5000 },
  pullRequestUrl: { type: String },
  branch: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_review', 'approved', 'changes_requested', 'closed'], default: 'pending' },
  reviewers: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, status: { type: String, default: 'pending' }, comments: { type: String } }],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  filesChanged: { type: Number, default: 0 },
  linesAdded: { type: Number, default: 0 },
  linesRemoved: { type: Number, default: 0 },
  comments: [{
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    file: { type: String, required: true },
    line: { type: Number },
    text: { type: String, required: true },
    resolved: { type: Boolean, default: false }
  }],
  mergeCommit: { type: String },
}, { timestamps: true });

CodeReviewSchema.index({ projectId: 1, status: 1 });
CodeReviewSchema.index({ author: 1 });

export default mongoose.model<ICodeReview>('CodeReview', CodeReviewSchema);
