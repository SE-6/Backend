import type { RequestHandler } from 'express';

// GET /posts  (public)
export const getAllPosts: RequestHandler = async (req, res) => {
  // TODO 1: fetch all posts
  //         hint: .lean() for plain objects, and
  //               .populate('author', 'firstName lastName') to include the author's name
  // TODO 2: respond with the posts
};

// GET /posts/:id  (public)
export const getPostById: RequestHandler = async (req, res) => {
  // TODO 1: read id from req.params
  // TODO 2: find the post by id (lean + populate the author like above)
  // TODO 3: if not found -> throw new Error('No post was found', { cause: { status: 404 } })
  // TODO 4: respond with the post
};

// POST /posts  (protected: authenticate + validateBodyZod)
export const createPost: RequestHandler = async (req, res) => {
  // TODO 1: read title + content from req.body
  // TODO 2: create the post => author MUST come from req.user?.id, NOT the body
  // TODO 3: respond 201 with a message + the created post
};

// PUT /posts/:id  (protected: authenticate + authorize + validateBodyZod)
export const updatePost: RequestHandler = async (req, res) => {
  // TODO 1: read id from req.params and title + content from req.body
  // TODO 2: find by id and update, returning the UPDATED document
  //         hint: { returnDocument: 'after' }
  // TODO 3: if not found -> throw 404
  // TODO 4: respond with a message + the updated post
};

// DELETE /posts/:id  (protected: authenticate + authorize)
export const deletePost: RequestHandler = async (req, res) => {
  // TODO 1: read id from req.params
  // TODO 2: find by id and delete
  // TODO 3: if not found -> throw 404
  // TODO 4: respond with a confirmation message
};
