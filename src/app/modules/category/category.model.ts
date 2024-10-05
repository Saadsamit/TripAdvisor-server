import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
});

const category = model<TCategory>('category', categorySchema);

export default category;
