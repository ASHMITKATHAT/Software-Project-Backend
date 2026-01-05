import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  projectId: mongoose.Types.ObjectId;
  totalBudget: number;
  spentAmount: number;
  currency: string;
  category: string;
  transactions: Array<{ description: string; amount: number; type: string; date: Date; receipt?: string; approvedBy?: mongoose.Types.ObjectId }>;
  approvedBy?: mongoose.Types.ObjectId;
  status: 'draft' | 'active' | 'frozen' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  totalBudget: { type: Number, required: true, min: 0 },
  spentAmount: { type: Number, default: 0, min: 0 },
  currency: { type: String, default: 'USD' },
  category: { type: String, required: true, trim: true },
  transactions: [{
    description: { type: String, required: true, maxlength: 500 },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['expense', 'income', 'transfer'], required: true },
    date: { type: Date, default: Date.now },
    receipt: { type: String },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  }],
  approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft', 'active', 'frozen', 'closed'], default: 'draft' },
}, { timestamps: true });

BudgetSchema.index({ projectId: 1, category: 1 });
BudgetSchema.index({ projectId: 1, status: 1 });

export default mongoose.model<IBudget>('Budget', BudgetSchema);
