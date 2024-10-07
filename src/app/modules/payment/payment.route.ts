import { Router } from 'express';
import paymentController from './payment.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../const/user';

const route = Router();

route.get("/", auth(userRole.admin), paymentController.getAllPayment)

route.get("/my-payment", auth(), paymentController.myPayment)

route.post('/profile-verified', auth(), paymentController.profileVerified);

route.post('/confirm', paymentController.confirmPayment);

route.post('/fail', paymentController.failPayment);

export const paymentRoute = route;
