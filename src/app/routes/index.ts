import { Router } from 'express';
import basicRoute from '../modules/basic';
import { userRoute } from '../modules/user/user.route';
import { teamRoutes } from '../modules/Teams/team.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: basicRoute,
  },
  {
    path: '/auth',
    route: userRoute,
  },
  {
    path: '/team',
    route: teamRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router
