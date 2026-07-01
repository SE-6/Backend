import { Router } from 'express';

// TODO: import the controllers, middlewares and schemas you need

const postRouter = Router();

// TODO: define the routes. Reads are public; writes need auth.
//   GET    /        getAllPosts
//   POST   /        middlewares?
//   GET    /:id
//   PUT    /:id
//   DELETE /:id

// hint:
// postRouter
//  .route('/')
//  .get(...)
//  .post(authenticate, authorize, validateBodyZod(postSchema), updatePost

export default postRouter;
