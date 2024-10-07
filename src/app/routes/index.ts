import { Router } from 'express';
import basicRoute from '../modules/basic';
import { teamRoutes } from '../modules/Teams/team.routes';
import { postRoutes } from '../modules/post/post.route';
import { authRoute } from '../modules/auth/auth.route';
import { userRoute } from '../modules/user/user.route';
import { commentRoutes } from '../modules/comments/comments.route';
import { categoryRoutes } from '../modules/category/category.route';
import { paymentRoute } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: basicRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/team',
    route: teamRoutes,
  },
  {
    path: '/post',
    route: postRoutes,
  },
  {
    path: '/comments',
    route: commentRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
