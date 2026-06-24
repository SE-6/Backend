import type { RequestHandler } from 'express';
import { Post } from '#models';

// GET /posts
export const getAllPosts: RequestHandler = async (req, res) => {
  const posts = await Post.find().populate('author', 'firstName lastName');
  res.json(posts);
};

// GET /posts/:id
export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate('author', 'firstName lastName');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
};

// POST /posts
export const createPost: RequestHandler = async (req, res) => {
  const { title, content, author } = req.body;
  // const image = req.file; // single file
  const files = (req.files as Express.Multer.File[]) || [];

  const imageUrls = files.map((file) => file.path);

  const newPost = await Post.create({
    title,
    content,
    author,
    image_url: imageUrls,
  });

  console.log('Cloudinary upload results:', imageUrls);

  res.status(201).json(newPost);
};

// PUT /posts/:id
export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(updatedPost);
};

// DELETE /posts/:id
export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json({ message: 'Post deleted successfully', post: deletedPost });
};
