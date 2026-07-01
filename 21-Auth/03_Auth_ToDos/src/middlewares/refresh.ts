import type { RequestHandler } from 'express';

// POST /auth/refresh — mints a fresh access token from a valid refresh cookie.
// Note: this is NOT behind authenticate — by now the access token is already expired,
// so the refresh cookie itself is the proof of identity.
export const refresh: RequestHandler = async (req, res) => {
  // TODO: read req.cookies.refreshToken; missing -> throw 401 'No refresh token'
  // TODO: verify it with jwt.verify(token, process.env.REFRESH_JWT_SECRET); invalid -> throw 401
  // TODO: load the user by decoded.jti; gone -> throw 401 'User not found'
  // TODO: sign a NEW access token, set the access cookie, respond with a message
};

export default refresh;
