import { Router } from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
// import { userRole } from '../../const/user';
import validateRequest from '../../middlewares/validateRequest';
import { creatCeategorySchemaValidation } from './category.validation';

const router = Router();

router.get('/', auth(), categoryController.getAllCategory);

router.post('/create', auth(), validateRequest(creatCeategorySchemaValidation), categoryController.createCategory);

export const categoryRoutes = router;
