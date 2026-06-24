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

    content: z
      .string({ error: 'content must be a string' })
      .min(5, { message: 'content must be at least 5 characters long' }),

    author: objectIdRefined,
    // image_url: z.url().optional(),

    image_url: z.array(z.url()).optional(),

    // author: z
    //   .string({ error: 'author must be a string' })
    //   .min(24, { message: 'author (userID) is required' }),
  })
  .strict();
