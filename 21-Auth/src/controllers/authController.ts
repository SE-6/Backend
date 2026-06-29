import { User } from '#models';
import type { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// POST /auth/register
export const register: RequestHandler = async (req, res) => {
  /*
        Check if user exist(email) [X]
        - If user exists, return an Error [X]
        - If user does not exist:
            - Secure the users password using bcrypt [X]
            - Store the user in DB [X]
            - Generate/Sign a Token [X]
            - Return the token

    */

  const { firstName, lastName, email, password } = req.body;

  // 1) is the email aready taken?
  const userExist = await User.exists({ email });
  if (userExist) {
    throw new Error('Registration failed', { cause: { status: 400 } });
  }

  // 2) hash the pw, then create the user
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { jti: user._id, roles: user.roles },
    process.env.ACCESS_JWT_SECRET!,
    { expiresIn: '1h', issuer: process.env.JWT_ISSUER },
  );

  // exclude something!

  res.status(201).json({ message: 'Registered successfuly', user, token });
};

// POST /auth/login
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials', { cause: { status: 401 } });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new Error('Invalid credentials', { cause: { status: 401 } });

  const token = jwt.sign(
    { jti: user._id, roles: user.roles },
    process.env.ACCESS_JWT_SECRET!,
    { expiresIn: '1h', issuer: process.env.JWT_ISSUER },
  );

  const { password: _pw, ...safeUser } = user.toObject();

  res.json({ message: 'Logged in susccessfully', user: safeUser, token });
};

export const me: RequestHandler = async (req, res) => {
  const user = await User.findById(req.user?.id);
  if (!user) throw new Error('User not found', { cause: { status: 404 } });
  res.json(user);
};
