import { authenticate, authorize, validateBodyZod, upload } from '#middlewares';
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
    .post(authenticate, upload.single('image'), validateBodyZod(postSchema), createPost); // logged in; image optional

postRouter
  .route('/:id')
  .get(getPostById)
  .put(authenticate, authorize, upload.single('image'), validateBodyZod(postSchema), updatePost) // logged in + owner/admin can edit
  .delete(authenticate, authorize, deletePost);

export default postRouter;
