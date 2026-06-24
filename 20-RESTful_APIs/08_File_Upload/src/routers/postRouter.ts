import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '#controllers';
import { upload, validateBodyZod } from '#middlewares';
import { postInputSchema } from '#schemas';

const postRouter = Router();

postRouter.get('/', getAllPosts);

postRouter.post(
  '/',
  upload.array('image', 4),
  validateBodyZod(postInputSchema),
  createPost,
);

postRouter.get('/:id', getPostById);
postRouter.put('/:id', validateBodyZod(postInputSchema), updatePost);
postRouter.delete('/:id', deletePost);

export default postRouter;
