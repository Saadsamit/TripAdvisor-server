import { model, Schema } from 'mongoose';
import { TComment, TComments } from './comments.interface';

const commentSchema = new Schema<TComment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  }
);

const commentsSchema = new Schema<TComments>(
  {
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    postUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: {
      type: [commentSchema],
      required: true,
    },
  },
  { timestamps: true },
);

const comment = model<TComments>('Comment', commentsSchema);

export default comment;
