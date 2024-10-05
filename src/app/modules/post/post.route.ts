import { Router } from 'express';
import { postController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPostSchemaValidation, updatePostSchemaValidation } from './post.validation';
import auth from '../../middlewares/auth';
import { userRole } from '../../const/user';

const router = Router();

router.get('/', postController.getAllPost);

router.get('/my-posts', auth(userRole.user), postController.getMyPost);

router.get('/:id', auth(), postController.getAPost);

router.delete('/my-post/:id', auth(), postController.deleteMyPost);

router.put('/my-post/:id', auth(), validateRequest(updatePostSchemaValidation), postController.updateMyPost);

router.post('/like/:id', auth(), postController.likeAPost);

router.post('/dislike/:id', auth(), postController.dislikeAPost);

router.post('/follow/:followerId', auth(), postController.followUser);

router.post('/create', auth(userRole.user), validateRequest(createPostSchemaValidation), postController.createPost);

export const postRoutes = router;
