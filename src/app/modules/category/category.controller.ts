import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { categoryService } from './category.service';

const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const data = await categoryService.getAllCategoryDB(req);

  sendResponse(res, {
    success: data.length ? true : false,
    statusCode: data.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: data.length ? 'retrieved category successfully' : 'category not found',
    data,
  });
});

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const data = await categoryService.createCategoryDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'category added successfully',
    data,
  });
});

export const categoryController = {
  getAllCategory,
  createCategory,
};
