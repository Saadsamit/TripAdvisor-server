import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import paymentService from './payment.service';
import config from '../../config';
import payment from './payment.model';
import user from '../user/user.modal';

const profileVerified: RequestHandler = catchAsync(async (req, res) => {
  const data = await paymentService.profileVerifiedDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'profile verified successfully',
    data,
  });
});

const getAllPayment: RequestHandler = catchAsync(async (req, res) => {
  const data = await paymentService.getAllPaymentDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved all Payments successfully',
    data,
  });
});

const myPayment: RequestHandler = catchAsync(async (req, res) => {
  const data = await paymentService.myPaymentDB(req);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'retrieved my all Payments successfully',
    data,
  });
});

const confirmPayment: RequestHandler = async (req, res) => {
  const tranId = req.query?.tranId;
  const userId = req.query?.user;
  const price = req.query?.price;
  const status = 'success';

  const dataObj = { tranId, user: userId, price, status };

  const isExist = await payment.findOne({ user: userId });

  if (!isExist) {
    await payment.create(dataObj);
  } else {
    await payment.findByIdAndUpdate(isExist?._id, { status });
  }

  await user.findByIdAndUpdate(userId, { verified: true });

  res.redirect(`${config.client_url}/profile`);
};

const failPayment: RequestHandler = async (req, res, next) => {
  try {
    const tranId = req.query?.tranId;
    const user = req.query?.user;
    const price = req.query?.price;
    const status = 'failed';

    const dataObj = { tranId, user, price, status };

    const isExist = await payment.findOne({ user: user });

    if (!isExist) {
      await payment.create(dataObj);
    } else {
      await payment.findByIdAndUpdate(isExist?._id, { status });
    }

    res.redirect(`${config.client_url}/payment/fail`);
  } catch (err) {
    next(err);
  }
};

const paymentController = {
  profileVerified,
  getAllPayment,
  confirmPayment,
  myPayment,
  failPayment,
};

export default paymentController;
