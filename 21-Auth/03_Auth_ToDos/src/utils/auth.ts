import jwt from 'jsonwebtoken';
import type { Response } from 'express';

const TTL = Number(process.env.ACCESS_TOKEN_TTL);
const REFRESH_TTL = Number(process.env.REFRESH_TOKEN_TTL);

export const signAccessToken = (user: { _id: unknown; roles: string[] }) =>
  jwt.sign(
    { jti: String(user._id), roles: user.roles },
    process.env.ACCESS_JWT_SECRET!,
    {
      expiresIn: TTL,
      issuer: process.env.JWT_ISSUER,
    },
  );

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TTL * 1000,
  });
};

export const signRefreshToken = (user: { _id: unknown }) =>
  jwt.sign({ jti: String(user._id) }, process.env.REFRESH_JWT_SECRET!, {
    expiresIn: REFRESH_TTL,
    issuer: process.env.JWT_ISSUER,
  });

export const setRefreshCookie = (res: Response, token: string) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: REFRESH_TTL * 1000,
  });
};
