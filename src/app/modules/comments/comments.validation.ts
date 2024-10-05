import { z } from 'zod';

export const createCommentSchemaValidation = z.object({
  body: z.object({
    comment: z.string({ required_error: 'comment is Required' }),
    postId: z.string({ required_error: 'postId is Required' }),
  }),
});
