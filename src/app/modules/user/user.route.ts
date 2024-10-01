import { Router } from 'express';
import { userRole } from '../../const/user';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';

const route = Router();

route.get('/all-user', auth(userRole.admin), userController.allUser);

route.get('/my-profile', auth(), userController.myAccount);

export const userRoute = route;
