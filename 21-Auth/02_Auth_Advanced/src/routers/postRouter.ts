import { authenticate, authorize, validateBodyZod } from '#middlewares';
import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '#controllers';
import { postSchema } from '#schemas';

const postRouter = Router();

// prettier-ignore
postRouter
    .route('/')
    .get(getAllPosts)
    .post(authenticate, validateBodyZod(postSchema), createPost); // must be logged in to post

postRouter
  .route('/:id')
  .get(getPostById)
  .put(authenticate, authorize, validateBodyZod(postSchema), updatePost) // logged in + owner/admin can edit
  .delete(authenticate, authorize, deletePost);

export default postRouter;
