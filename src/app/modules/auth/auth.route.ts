import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  signupSchemaValidation,
  updateAccountSchemaValidation,
  loginSchemaValidation,
} from './auth.validation';
import { userRole } from '../../const/user';
import auth from '../../middlewares/auth';

const route = Router();

route.post(
  '/signup',
  validateRequest(signupSchemaValidation),
  authController.signup,
);

route.post(
  '/login',
  validateRequest(loginSchemaValidation),
  authController.login,
);

route.put('/role-update/:id', auth(userRole.admin), authController.roleUpdate);

route.patch(
  '/update-profile',
  auth(),
  validateRequest(updateAccountSchemaValidation),
  authController.updateAccount,
);

export const authRoute = route;


