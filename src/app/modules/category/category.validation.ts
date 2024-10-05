import { z } from 'zod';

export const creatCeategorySchemaValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is Required' }),
  }),
});
