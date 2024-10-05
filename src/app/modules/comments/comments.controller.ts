import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { commentService } from './comments.service';

const createComment: RequestHandler = catchAsync(async (req, res) => {
  const data = await commentService.createCommentDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'comment add successfully',
    data,
  });
});

const getAllComment: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await commentService.getAllCommentDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved comments successfully',
    data,
  });
});

const deteleComment: RequestHandler = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const id = req.params.id;
  const data = await commentService.deleteCommentDB(postId, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'comment delete successfully',
    data,
  });
});

export const commentController = {
  createComment,
  getAllComment,
  deteleComment,
};
