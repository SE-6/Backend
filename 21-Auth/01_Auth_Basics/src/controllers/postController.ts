import { Post } from '#models';
import type { RequestHandler } from 'express';

export const getAllPosts: RequestHandler = async (req, res) => {
  const posts = await Post.find()
    .lean()
    .populate('author', 'firstName lastName');
  res.json(posts);
};

export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .lean()
    .populate('author', 'firstName lastName');

  if (!post) throw new Error('No post was found', { cause: { status: 404 } });
  res.json(post);
};

export const createPost: RequestHandler = async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    title,
    content,
    author: req.user?.id,
  });

  res.status(201).json({ message: 'Post created', post });
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findByIdAndUpdate(
    id,
    { title, content },
    { returnDocument: 'after' },
  );

  if (!post) throw new Error('No post was found', { cause: { status: 404 } });
  res.json({ message: 'Post updated', post });
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new Error('No post was found', { cause: { status: 404 } });
  res.json({ message: `Post with id:${id} was deleted` });
};
