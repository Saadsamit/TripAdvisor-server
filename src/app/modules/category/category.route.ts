import { Router } from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { userRole } from '../../const/user';
import validateRequest from '../../middlewares/validateRequest';
import { creatCeategorySchemaValidation } from './category.validation';

const router = Router();

router.get('/', categoryController.getAllCategory);

router.post('/create', auth(userRole.admin), validateRequest(creatCeategorySchemaValidation), categoryController.createCategory);

export const categoryRoutes = router;
