import { Router } from 'express';
import { postController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPostSchemaValidation } from './post.validation';
import auth from '../../middlewares/auth';
import { userRole } from '../../const/user';

const router = Router();

router.get('/', postController.getAllPost);

router.get('/my-posts', auth(userRole.user), postController.getMyPost);

router.get('/:id', postController.getAPost);

router.post('/create', auth(userRole.user), validateRequest(createPostSchemaValidation), postController.createPost);

export const postRoutes = router;
