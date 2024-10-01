/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { userRole } from '../../const/user';
import { TNewUser } from '../auth/auth.interface';

export type TUserRole = keyof typeof userRole;

export type TUser = {
  role: TUserRole;
  verified: boolean;
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
