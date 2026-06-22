import { type RequestHandler } from 'express';
import { Post } from '#models';

export const getAllPosts: RequestHandler = async (req, res) => {
  const posts = await Post.find().populate('author', 'firstName lastName');

  if (!posts.length) {
    return res.status(404).json({ message: 'No users was found' });
  }
  res.json(posts);
};

export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }

  res.json(post);
};

export const createPost: RequestHandler = async (req, res) => {
  const newPost = await Post.create(req.body);

  res.status(201).json(newPost);
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.json({
    message: `Updated post with id: ${id}`,
    updatedPost: updatedPost,
  });
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  await Post.findByIdAndDelete(id);

  res.status(404).json({ message: `deleted post with id: ${id}` });
};
