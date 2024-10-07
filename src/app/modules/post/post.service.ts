import { Request } from 'express';
import AppError from '../../errors/AppError';
import comment from '../comments/comments.model';
import user from '../user/user.modal';
import { TPostData } from './post.interface';
import post from './post.model';
import { PipelineStage } from 'mongoose';

const getAllPostDB = async (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const categoryQuery = req?.query?.category;
  const sortQuery = req?.query?.sort;
  const pipeline: PipelineStage[] = [];

  if (categoryQuery) {
    pipeline.push({
      $match: {
        category: categoryQuery,
      },
    });
  }

  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user',
    },
  });

  pipeline.push({
    $unwind: {
      path: '$user',
      preserveNullAndEmptyArrays: true,
    },
  });

  pipeline.push({
    $addFields: {
      upvoteCount: { $size: '$upvote' },
    },
  });

  if (sortQuery) {
    pipeline.push({
      $sort: {
        upvoteCount: -1,
      },
    });
  } else {
    pipeline.push({
      $sort: {
        createdAt: -1,
      },
    });
  }

  pipeline.push({
    $skip: (page - 1) * limit,
  });

  pipeline.push({
    $limit: limit,
  });
  const findData = await post.aggregate(pipeline);

  const totalItems = await post.countDocuments();
  const totalPages = Math.ceil(totalItems / limit);

  return { data: findData, totalPages, currentPage: page };
};

const getAPostDB = async (id: string) => {
  const findData = await post.findById(id).populate('user');
  return findData;
};

const getAUserPostDB = async (id: string) => {
  const findData = await post.find({ user: id }).sort('-createdAt');
  return findData;
};

const createPostDB = async (payload: TPostData, id: string) => {
  const data = { ...payload, user: id };
  const newPost = await post.create(data);

  await comment.create({
    _id: newPost?.comments,
    postUser: id,
    postId: newPost?._id,
    comments: [],
  });

  await user.findByIdAndUpdate(id, { $inc: { posts: 1 } });

  return newPost;
};

const updatePostDB = async (payload: TPostData, id: string) => {
  return await post.findByIdAndUpdate(id, payload);
};

const deleteMyPostDB = async (id: string, userId: string) => {
  const isExist = await post.findById(id);
  if (!isExist) {
    throw new AppError(404, 'post not found');
  }
  await user.findByIdAndUpdate(userId, { $inc: { posts: -1 } });
  await comment.findOneAndDelete({ postId: isExist?._id });
  return await post.findByIdAndDelete(id);
};

const likeAPostDB = async (id: string, userId: string) => {
  const isExist = await post.findOne({
    _id: id,
    upvote: { $in: [userId] },
  });
  if (!isExist) {
    await post.findByIdAndUpdate(id, {
      $addToSet: { upvote: userId },
      $pull: { downvote: userId },
    });
    return 'upvote';
  }
  await post.findByIdAndUpdate(id, {
    $pull: { upvote: userId },
  });
  return 'upvote remove';
};

const dislikeAPostDB = async (id: string, userId: string) => {
  const isExist = await post.findOne({
    _id: id,
    downvote: { $in: [userId] },
  });
  if (!isExist) {
    await post.findByIdAndUpdate(id, {
      $addToSet: { downvote: userId },
      $pull: { upvote: userId },
    });
    return 'downvote';
  }
  await post.findByIdAndUpdate(id, {
    $pull: { downvote: userId },
  });
  return 'downvote remove';
};

const followUserDB = async (followerId: string, followingId: string) => {
  const isExist = await user.findOne({
    _id: followerId,
    followers: { $in: [followingId] },
  });
  if (!isExist) {
    await user.findByIdAndUpdate(followingId, {
      $addToSet: { following: followerId },
    });
    await user.findByIdAndUpdate(followerId, {
      $addToSet: { followers: followingId },
    });
    return 'follow';
  }
  await user.findByIdAndUpdate(followingId, {
    $pull: { following: followerId },
  });
  await user.findByIdAndUpdate(followerId, {
    $pull: { followers: followingId },
  });
  return 'unfollow';
};

const getMyPostDB = async (id: string) => {
  return await post.find({ user: id }).sort('-createdAt');
};

export const postService = {
  getAllPostDB,
  getAPostDB,
  getAUserPostDB,
  createPostDB,
  likeAPostDB,
  deleteMyPostDB,
  getMyPostDB,
  dislikeAPostDB,
  followUserDB,
  updatePostDB,
};
