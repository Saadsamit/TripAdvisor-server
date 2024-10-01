import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';


const myAccount = catchAsync(async (req: Request, res: Response) => {
  const data = await userService.myAccountDB(req);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User get successfully',
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

export const userController = {
  myAccount,
  allUser,
};
