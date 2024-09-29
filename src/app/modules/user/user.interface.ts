/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { userRole } from "../../const/user";

export type TUser = {
  name: string;
  email: string;
  role:  keyof typeof userRole;
  password: string;
  picture: string;
  posts: number;
  followers: number;
  following: number;
};

export interface TUserModel extends Model<TUser> {
  isPasswordMatched(
    textPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}