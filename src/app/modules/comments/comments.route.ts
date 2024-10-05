import { Router } from 'express';
import { commentController } from './comments.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createCommentSchemaValidation } from './comments.validation';

const router = Router();

router.post('/create', auth(), validateRequest(createCommentSchemaValidation), commentController.createComment);

router.get('/:id', auth(), commentController.getAllComment);

router.delete('/:postId/:id', auth(), commentController.deteleComment);

export const commentRoutes = router;
