import { Router } from 'express';
import { postController } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createPostSchemaValidation,
  updatePostSchemaValidation,
} from './post.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', postController.getAllPost);

router.get('/my-posts', auth(), postController.getMyPost);

router.get('/:id', auth(), postController.getAPost);

router.get('/user/:id', auth(), postController.getAUserPost);

router.delete('/my-post/:id', auth(), postController.deleteMyPost);

router.put(
  '/my-post/:id',
  auth(),
  validateRequest(updatePostSchemaValidation),
  postController.updateMyPost,
);

router.post('/like/:id', auth(), postController.likeAPost);

router.post('/dislike/:id', auth(), postController.dislikeAPost);

router.post('/follow/:followerId', auth(), postController.followUser);

router.post(
  '/create',
  auth(),
  validateRequest(createPostSchemaValidation),
  postController.createPost,
);

export const postRoutes = router;
