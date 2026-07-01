import type { RequestHandler } from 'express';

// Reads the access token from the cookie, verifies it, and puts req.user in place.
const authenticate: RequestHandler = (req, res, next) => {
  // TODO: read the token from req.cookies.accessToken
  //       no token -> next(new Error('Not authenticated', { cause: { status: 401 } }))
  // TODO: verify it with jwt.verify(token, process.env.ACCESS_JWT_SECRET)
  //       success -> req.user = { id: decoded.jti, roles: decoded.roles ?? [] }, then next()
  // TODO: on failure -> next() a 401
  //       ('Expired access token' for jwt.TokenExpiredError, otherwise 'Invalid token')
};

export default authenticate;
