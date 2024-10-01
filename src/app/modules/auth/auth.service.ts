import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { Request } from 'express';
import AppError from '../../errors/AppError';
import { TNewUser, TUserLogin } from './auth.interface';
import user from '../user/user.modal';

const createUserDB = async (payload: TNewUser) => {
  const newUser = await user.create(payload);
  return newUser;
};

const userLogin = async (payload: TUserLogin) => {
  const isExist = await user.findOne(
    { email: payload.email },
    'password email picture name role',
  );

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await user.isPasswordMatched(payload.password, isExist.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'You enter wrong password');
  }

  const userData = {
    _id: isExist._id,
    email: isExist.email,
    role: isExist.role,
    picture: isExist.picture,
    name: isExist.name,
  };
  const token = jwt.sign(userData, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return { token };
};

const updateAccountDB = async (req: Request) => {
  const { email } = req.user;
  const payload = req.body;
  const result = await user.findOneAndUpdate({ email }, payload);
  return result;
};

const roleUpdateDB = async (req: Request) => {
  const id = req.params.id;
  const data = req.body;
  const result = await user.findByIdAndUpdate(id, data);
  return result;
};

export const authService = {
  createUserDB,
  userLogin,
  updateAccountDB,
  roleUpdateDB,
};
