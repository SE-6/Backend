import { User } from '#models';
import { type RequestHandler } from 'express';

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.find();

  if (!users.length) {
    return res.status(404).json({ message: 'No users was found' });
  }
  res.json(users);
};

export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.json(user);
};

export const createUser: RequestHandler = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({ message: 'user created successfully', newUser });

  res.json({ message: 'User created successfully', user: req.body });
};

export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    returnDocument: 'after',
  });

  if (!updatedUser) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.json({
    message: `Updated user with id: ${id}`,
    updatedUser: updatedUser,
  });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deleteUser = await User.findByIdAndDelete(id);

  if (!deleteUser) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.status(404).json({ message: `deleted user with id: ${id}` });
};
