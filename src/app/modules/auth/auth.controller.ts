import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createUserDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { token } = await authService.userLogin(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: token,
    data: null,
  });
});

const updateAccount = catchAsync(async (req: Request, res: Response) => {
  const { token, result } = await authService.updateAccountDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User update successfully',
    data: result,
    token
  });
});

const roleUpdate = catchAsync(async (req: Request, res: Response) => {
  const data = await authService.roleUpdateDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User role update successfully',
    data: data,
  });
});

export const authController = {
  signup,
  login,
  updateAccount,
  roleUpdate,
};
