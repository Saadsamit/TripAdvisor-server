import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { postService } from './post.service';

const getAllPost: RequestHandler = catchAsync(async (req, res) => {
  const data = await postService.getAllPostDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved posts successfully',
    ...data,
  });
});

const getAPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await postService.getAPostDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved post successfully',
    data,
  });
});

const getAUserPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await postService.getAUserPostDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved post successfully',
    data,
  });
});

const createPost: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;
  const id = req.user.id;
  const data = await postService.createPostDB(payload, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'post create successfully',
    data,
  });
});

const updateMyPost: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const data = await postService.updatePostDB(payload, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'post update successfully',
    data,
  });
});

const deleteMyPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const data = await postService.deleteMyPostDB(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'post deleted successfully',
    data,
  });
});

const deleteById: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await postService.deleteByIdDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'post deleted successfully',
    data,
  });
});

const likeAPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const data = await postService.likeAPostDB(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `post ${data} successfully`,
    data,
  });
});

const dislikeAPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const data = await postService.dislikeAPostDB(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `post ${data} successfully`,
    data,
  });
});

const followUser: RequestHandler = catchAsync(async (req, res) => {
  const followerId = req.params.followerId;
  const followingId = req.user.id;
  const data = await postService.followUserDB(followerId, followingId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `user ${data} successfully`,
    data,
  });
});

const getMyPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.user.id;
  const data = await postService.getMyPostDB(id);

  sendResponse(res, {
    success: data.length ? true : false,
    statusCode: data.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: data.length ? 'retrieved posts successfully' : 'post not found',
    data,
  });
});

export const postController = {
  getAllPost,
  getAPost,
  createPost,
  likeAPost,
  getMyPost,
  dislikeAPost,
  followUser,
  deleteById,
  deleteMyPost,
  updateMyPost,
  getAUserPost,
};
