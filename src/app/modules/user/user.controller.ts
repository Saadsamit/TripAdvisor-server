import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { token } = await userService.userLogin(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: token,
    data: null,
  });
});

const myAccount = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.myAccountDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User get successfully',
    data: data,
  });
});

const updateAccount = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.updateAccountDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User update successfully',
    data: data,
  });
});

const allUser = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.allUserDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User get successfully',
    data: data,
  });
});

const roleUpdate = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.roleUpdateDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User role update successfully',
    data: data,
  });
});

export const userController = {
  signup,
  login,
  myAccount,
  updateAccount,
  allUser,
  roleUpdate,
};
