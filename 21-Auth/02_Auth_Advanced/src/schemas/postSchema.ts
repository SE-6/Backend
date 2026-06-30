import z from 'zod/v4';

export const postSchema = z
  .object({
    title: z.string().min(5, 'title is required'),
    content: z.string().min(5, 'content is required'),
  })
  .strict();
