import { upload, validateBodyZod } from '#middlewares';
import { blogPostInputSchema } from '#schemas';
import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '#controllers';

const blogPostRouter = Router();

blogPostRouter.get('/', getAllPosts);
blogPostRouter.post(
  '/',
  upload.single('image'),
  validateBodyZod(blogPostInputSchema),
  createPost,
);

blogPostRouter.get('/:id', getPostById);
blogPostRouter.put(
  '/:id',
  upload.single('image'),
  validateBodyZod(blogPostInputSchema),
  updatePost,
);
blogPostRouter.delete('/:id', deletePost);

export default blogPostRouter;
