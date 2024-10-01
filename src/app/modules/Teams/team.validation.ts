import { z } from 'zod';

const teamSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    role: z.string(),
  }),
});

export default teamSchemaValidation;
