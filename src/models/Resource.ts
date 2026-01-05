import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  type: 'human' | 'equipment' | 'software' | 'infrastructure' | 'budget';
  description: string;
  quantity: number;
  unit: string;
  cost: number;
  allocatedAt: Date;
  deallocatedAt?: Date;
  status: 'available' | 'allocated' | 'depleted' | 'maintenance';
  assignedTo?: mongoose.Types.ObjectId;
  metadata: Record<string, any>;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['human', 'equipment', 'software', 'infrastructure', 'budget'], required: true },
  description: { type: String, trim: true, maxlength: 2000 },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true },
  cost: { type: Number, default: 0 },
  allocatedAt: { type: Date, default: Date.now },
  deallocatedAt: { type: Date },
  status: { type: String, enum: ['available', 'allocated', 'depleted', 'maintenance'], default: 'available' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

ResourceSchema.index({ projectId: 1, type: 1 });
ResourceSchema.index({ projectId: 1, status: 1 });

export default mongoose.model<IResource>('Resource', ResourceSchema);
