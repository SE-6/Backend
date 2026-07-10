import z from 'zod/v4';

export const postSchema = z
  .object({
    title: z.string().min(3, 'title must be at least 5 characters'),
    content: z.string().min(5, 'content must be at least 5 characters'),
  })
  .strict();
