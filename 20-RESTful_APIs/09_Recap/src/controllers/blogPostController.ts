import { BlogPost } from '#models';
import type { RequestHandler } from 'express';
import { v2 as cloudinary } from 'cloudinary';

// GET /post
export const getAllPosts: RequestHandler = async (req, res) => {
  const posts = await BlogPost.find(); // SELECT * FROM BLOGPOST

  if (posts.length === 0) {
    return res.json({ message: 'no posts were found' });
  }

  res.json(posts);
};

// GET /posts/:id
export const getPostById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findById(id);

  //   const post2 = await BlogPost.findById(req.params.id);

  if (!post) {
    throw new Error('Post not found', { cause: { status: 404 } });
  }

  res.json(post);
};

// POST /post
export const createPost: RequestHandler = async (req, res) => {
  const { title, content, author } = req.body;
  const image = req.file;

  const newPost = await BlogPost.create({
    title,
    content,
    author,
    image_url: image?.path, // Cloudinary url
    image_public_id: image?.filename, // public id
  });

  console.log('Cloudinary response:', image);

  res.status(201).json({ message: 'Post created', newPost });
};

// PUT /posts/:id
export const updatePost: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const image = req.file;

  const post = await BlogPost.findById(id);

  if (!post) {
    throw new Error('Post not found', { cause: { status: 404 } });
  }

  if (image) {
    if (post.image_public_id) {
      await cloudinary.uploader.destroy(post.image_public_id);
    }

    post.image_url = image.path;
    post.image_public_id = image.filename;
  }

  post.title = title;
  post.content = content;
  post.author = author;

  const updated = await post.save();
  res.json({ message: 'Post updated', updated });
};

// DELETE /posts/:id
export const deletePost: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deleted = await BlogPost.findByIdAndDelete(id);
  if (!deleted) throw new Error('Post not found', { cause: { status: 404 } });

  if (deleted.image_public_id) {
    await cloudinary.uploader.destroy(deleted.image_public_id);
  }

  res.json({ message: `Post with id: ${id} was deleted` });
};
