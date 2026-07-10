import { Post } from '#models';
import type { RequestHandler } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { generateAndStoreImage } from './openAI.ts';

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
  const author = req.user?.id; // the logged in user from the token
  const image = req.file;

  let image_url = image?.path; // cloudinary url
  let image_public_id = image?.filename;

  // no image uploaded? let AI generate
  if (!image) {
    const generated = await generateAndStoreImage(title);
    image_url = generated.image_url;
    image_public_id = generated.image_public_id;
  }

  const newPost = await Post.create({
    title,
    content,
    author,
    image_url,
    image_public_id,
  });

  res.status(201).json({ message: 'Post created', newPost });
};

export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body; // author never changes on update
  const image = req.file;

  const post = await Post.findById(id);

  if (!post) {
    throw new Error('Post not found', { cause: { status: 404 } });
  }

  // a new image was uploaded → replace the old one on Cloudinary
  if (image) {
    if (post.image_public_id) {
      await cloudinary.uploader.destroy(post.image_public_id);
    }

    post.image_url = image.path;
    post.image_public_id = image.filename;
  }

  post.title = title;
  post.content = content;

  const updated = await post.save();
  res.json({ message: 'Post updated', updated });
};

export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deleted = await Post.findByIdAndDelete(id);
  if (!deleted) throw new Error('Post not found', { cause: { status: 404 } });

  if (deleted.image_public_id) {
    await cloudinary.uploader.destroy(deleted.image_public_id);
  }

  res.json({ message: `Post with id: ${id} was deleted` });
};
