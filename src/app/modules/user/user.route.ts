import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  signupSchemaValidation,
  updateAccountSchemaValidation,
  loginSchemaValidation,
} from './user.validation';
import { userRole } from '../../const/user';
import auth from '../../middlewares/auth';

const route = Router();

route.post(
  '/signup',
  validateRequest(signupSchemaValidation),
  userController.signup,
);

route.post(
  '/login',
  validateRequest(loginSchemaValidation),
  userController.login,
);

route.get('/allUser', auth(userRole.admin), userController.allUser);

route.put('/roleUpdate/:id', auth(userRole.admin), userController.roleUpdate);

route.get('/myAccount', auth(), userController.myAccount);

route.patch(
  '/updateAccount',
  auth(),
  validateRequest(updateAccountSchemaValidation),
  userController.updateAccount,
);

export const userRoute = route;
