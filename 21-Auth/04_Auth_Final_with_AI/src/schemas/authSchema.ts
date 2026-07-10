import z from 'zod/v4';

export const registerSchema = z
  .object({
    firstName: z.string().min(2, 'firstName must be at least 2 characters'),
    lastName: z.string().min(2, 'lastName must be at least 2 characters'),
    email: z.email('a valid email is required'),
    password: z.string().min(6, 'password must be at least 6 characters'),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email('a valid email is required'),
    password: z.string().min(1, 'password is required'),
  })
  .strict();
