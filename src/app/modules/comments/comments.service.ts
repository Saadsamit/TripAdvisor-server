import { Request } from 'express';
import comment from './comments.model';
import AppError from '../../errors/AppError';

const createCommentDB = async (req: Request) => {
  const user = req.user.id;
  const postId = req.body?.postId;
  const newComment = {
    user,
    comment: req.body?.comment,
  };
  const isExist = await comment.findOne({ postId });
  if (!isExist) {
    throw new AppError(404, "post not found")
  }

  return comment.findOneAndUpdate(
    { postId },
    { $push: { comments: newComment } },
  );
};

const getAllCommentDB = async (id: string) => {
  const data = await comment.findById(id).populate({
    path: 'comments.user',
    select: 'name picture verified',
  });
  return data;
};

const deleteCommentDB = async (postId: string, id: string) => {
  const comments = { _id: id };
  const isExist = await comment.findOne({ postId });
  if (!isExist) {
    throw new AppError(404, 'comment not Exist');
  }
  return await comment.findOneAndUpdate(
    { postId },
    { $pull: { comments } },
    { new: true },
  );
};

export const commentService = {
  createCommentDB,
  getAllCommentDB,
  deleteCommentDB,
};
