import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { postService } from './post.service';

const getAllPost: RequestHandler = catchAsync(async (req, res) => {
  const data = await postService.getAllPostDB();

  sendResponse(res, {
    success: data.length ? true : false,
    statusCode: data.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: data.length ? 'retrieved posts successfully' : 'post not found',
    data,
  });
});

const getAPost: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.postId;
  const data = await postService.getAPostDB(id);

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
  getMyPost,
};
