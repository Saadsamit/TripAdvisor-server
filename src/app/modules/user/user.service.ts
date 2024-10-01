import { Request } from 'express';
import user from '../user/user.modal';

const myAccountDB = async (req: Request) => {
  const { email } = req.user;
  const result = await user.findOne({ email });
  return result;
};

const allUserDB = async () => {
  const result = await user.find();
  return result;
};

export const userService = {
  myAccountDB,
  allUserDB,
};
