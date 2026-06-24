import { z } from 'zod/v4';

export const userInputSchema = z
  .object({
    firstName: z
      .string({ error: 'firstName must be a string' })
      .min(2, { message: 'firstName must be at laest 2 characters' }),

    lastName: z
      .string({ error: 'lastName must be a string' })
      .min(2, { message: 'lastName must be at laest 2 characters' }),

    email: z
      // .string({ error: 'email must be a string' })
      .email({ message: 'email must be a valid email address' }),

    //   email: z
    //     .string({ error: 'email must be a string' })
    //     .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    //       message: 'email must be a valid email address',
    //     }),
  })
  .strict();
