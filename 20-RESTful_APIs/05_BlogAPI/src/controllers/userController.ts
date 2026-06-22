import type { RequestHandler } from 'express';
import { User } from '#models';

// GET /users
export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET /users/:id
export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

// POST /users
export const createUser: RequestHandler = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

// PUT /users/:id
export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    returnDocument: 'after', // return the updated document, not the old one
    runValidators: true, // schema validation also runs on updates
  });

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(updatedUser);
};

// DELETE /users/:id
export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User deleted successfully', user: deletedUser });
};
