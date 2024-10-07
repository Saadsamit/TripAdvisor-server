import { Router } from 'express';
import paymentController from './payment.controller';
import auth from '../../middlewares/auth';

const route = Router();

route.post('/profile-verified', auth(), paymentController.prifileVerified);

route.post('/confirm', paymentController.confirmPayment);

route.post('/fail', paymentController.failPayment);

export const paymentRoute = route;
