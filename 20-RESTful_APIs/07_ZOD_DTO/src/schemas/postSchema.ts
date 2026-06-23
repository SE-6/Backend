import { Types } from 'mongoose';
import { z } from 'zod/v4';

const objectIdRefined = z
  .string()
  .refine((v) => Types.ObjectId.isValid(v), { message: 'Invalid objectID' });

export const postInputSchema = z
  .object({
    title: z
      .string({ error: 'title must be a string' })
      .min(5, { message: 'title must be at least 5 characters long' }),

    body: z
      .string({ error: 'body must be a string' })
      .min(5, { message: 'body must be at least 5 characters long' }),

    author: objectIdRefined,

    // author: z
    //   .string({ error: 'author must be a string' })
    //   .min(24, { message: 'author (userID) is required' }),
  })
  .strict();
