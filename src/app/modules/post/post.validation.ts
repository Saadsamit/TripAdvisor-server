import { z } from 'zod';

export const createPostSchemaValidation = z.object({
  body: z.object({
    post: z.string({ required_error: 'post is Required' }),
  }),
});
