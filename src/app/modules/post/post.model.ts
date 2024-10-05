import mongoose, { model, Schema } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    post: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category:{
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      default: () => new mongoose.Types.ObjectId(),
    },
    upvote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    downvote: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const post = model<TPost>('Post', postSchema);

export default post;
