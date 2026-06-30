import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { User } from '#models';
import { setAuthCookie, signAccessToken } from '#utils';

export const refresh: RequestHandler = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) throw new Error('No refresh token', { cause: { status: 401 } });

  let decoded: jwt.JwtPayload;

  try {
    decoded = jwt.verify(
      token,
      process.env.REFRESH_JWT_SECRET!,
    ) as jwt.JwtPayload;
  } catch (error) {
    throw new Error('Invalid refresh token', { cause: { status: 401 } });
  }

  const user = await User.findById(decoded.jti);
  if (!user) throw new Error('User not found', { cause: { status: 401 } });

  const accessToken = signAccessToken(user);
  setAuthCookie(res, accessToken);

  res.json({ mesage: 'Token refreshed' });
};

export default refresh;
