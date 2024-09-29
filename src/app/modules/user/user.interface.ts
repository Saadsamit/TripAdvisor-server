/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { userRole } from '../../const/user';

export type TUserRole = keyof typeof userRole;

export type TUserLogin = {
  email: string;
  password: string;
};

export type TNewUser = {
  name: string;
  picture: string;
} & TUserLogin;

export type TUser = {
  role: TUserRole;
  posts: number;
  followers: number;
  following: number;
} & TNewUser;

export interface TUserModel extends Model<TUser> {
  isPasswordMatched(
    textPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
