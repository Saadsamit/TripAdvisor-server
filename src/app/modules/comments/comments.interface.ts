import { ObjectId } from 'mongoose';

export type TComment = {
    user: ObjectId;
    comment: string
}

export type TComments = {
    postUser: ObjectId;
    postId: ObjectId;
    comments: TComment[];
}