import mongoose, { Schema, Document } from 'mongoose';

export interface IIssue extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  type: 'bug' | 'feature' | 'improvement' | 'task' | 'documentation';
  severity: 'trivial' | 'minor' | 'major' | 'critical' | 'blocker';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened' | 'blocked';
  assignee?: mongoose.Types.ObjectId;
  reporter: mongoose.Types.ObjectId;
  labels: string[];
  fixVersion?: string;
  dueDate?: Date;
  resolution?: string;
  linkedIssues: Array<{ issueId: mongoose.Types.ObjectId; relation: string }>;
  attachments: string[];
  comments: Array<{ author: mongoose.Types.ObjectId; text: string; createdAt: Date }>;
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true, trim: true, maxlength: 300 },
  description: { type: String, trim: true, maxlength: 10000 },
  type: { type: String, enum: ['bug', 'feature', 'improvement', 'task', 'documentation'], default: 'bug' },
  severity: { type: String, enum: ['trivial', 'minor', 'major', 'critical', 'blocker'], default: 'minor' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed', 'reopened', 'blocked'], default: 'open' },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' },
  reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  labels: [{ type: String, trim: true }],
  fixVersion: { type: String },
  dueDate: { type: Date },
  resolution: { type: String },
  linkedIssues: [{ issueId: { type: Schema.Types.ObjectId, ref: 'Issue' }, relation: { type: String } }],
  attachments: [{ type: String }],
  comments: [{
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

IssueSchema.index({ projectId: 1, status: 1 });
IssueSchema.index({ assignee: 1, status: 1 });

export default mongoose.model<IIssue>('Issue', IssueSchema);
