import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    link: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'link',
      required: true
    }
  },
  { timestamps: true }
);

entrySchema.index({ link: 1, name: 1 }, { unique: true });

export const Entry = mongoose.model('entry', entrySchema);
