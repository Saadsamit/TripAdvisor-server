import { model, Schema } from 'mongoose';
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
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
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
