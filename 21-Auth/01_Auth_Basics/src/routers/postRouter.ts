import { authenticate, authorize } from '#middlewares';
import { Router } from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from '#controllers';

const postRouter = Router();

// prettier-ignore
postRouter
    .route('/')
    .get(getAllPosts)
    .post(authenticate, createPost); // must be logged in to post

postRouter
  .route('/:id')
  .get(getPostById)
  .put(authenticate, authorize, updatePost) // logged in + owner/admin can edit
  .delete(authenticate, authorize, deletePost);

export default postRouter;
