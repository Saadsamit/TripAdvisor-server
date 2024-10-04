import { ObjectId } from 'mongoose';

export type TPostData = {
  post: string;
  user: ObjectId;
}

export type TPost = {
  upvote: ObjectId[];
  downvote: ObjectId[];
  comments: ObjectId;
} & TPostData;
