import { Entry } from '../entry.model';
import mongoose from 'mongoose';

describe('Entry model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = Entry.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
        trim: true,
        maxlength: 50
      });
    });

    test('status', () => {
      const status = Entry.schema.obj.status;
      expect(status).toEqual({
        type: String,
        required: true,
        enum: ['active', 'complete', 'pastdue'],
        default: 'active'
      });
    });

    test('notes', () => {
      const notes = Entry.schema.obj.notes;
      expect(notes).toEqual(String);
    });

    test('due', () => {
      const due = Entry.schema.obj.due;
      expect(due).toEqual(Date);
    });

    test('createdBy', () => {
      const createdBy = Entry.schema.obj.createdBy;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      });
    });

    test('link', () => {
      const link = Entry.schema.obj.link;
      expect(link).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'link',
        required: true
      });
    });
  });
});
