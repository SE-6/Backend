import z from 'zod';

export const blogPostInputSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: 'title must be at least 3 characters' }),
    content: z
      .string()
      .min(5, { message: 'content must be at least 5 characters' }),
    author: z.string().min(2, { message: 'author is required' }),
    image_url: z.url().optional(),
    image_public_id: z.string().optional(),
  })
  .strict();
