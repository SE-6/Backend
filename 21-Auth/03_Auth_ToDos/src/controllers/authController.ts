import type { RequestHandler } from 'express';

// TODO: import as needed User (#models), bcrypt, token/cookie helpers (#utils)
//
// 💡 throw new Error('message', { cause: { status: 4xx } }) → errorHandler turns it into a response

// POST /auth/register
export const register: RequestHandler = async (req, res) => {
  // TODO 1: read firstName, lastName, email, password from req.body
  //
  // TODO 2: is the email already taken?
  //         if so, throw new Error('Registration failed', { cause: { status: 400 } })
  // TODO 3: hash the password with bcrypt
  // TODO 4: create the user in the DB with the "HASHED" password
  // TODO 5: sign an access token AND a refresh token for the new user
  // TODO 6: set both as httpOnly cookies (setAuthCookie + setRefreshCookie)
  // TODO 7: respond 201 with a message + the user WITHOUT the password hash
  //         (hint: const { password: _pw, ...safeUser } = user.toObject();)
};

// POST /auth/login
export const login: RequestHandler = async (req, res) => {
  // TODO 1: read email + password from req.body
  // TODO 2: find the user by email => remember the password is select:false,
  //         so you must opt in: .select('+password')
  //         if no user -> throw 401 'Invalid credentials'
  // TODO 3: compare the password with bcrypt.compare(...)
  //         if it doesn't match -> throw 401 'Invalid credentials'
  //         (use the SAME message for both so you don't leak which one was wrong)
  // TODO 4: sign access + refresh tokens and set both cookies
  // TODO 5: respond with a message + the user WITHOUT the password hash
};

// GET /auth/me  (protected => runs after the authenticate middleware)
export const me: RequestHandler = async (req, res) => {
  // TODO 1: look up the user by req.user?.id
  //         (authenticate put the id there; password is excluded by the schema)
  // TODO 2: if no user -> throw new Error('User not found', { cause: { status: 404 } })
  // TODO 3: respond with the user
};

// DELETE /auth/logout
export const logout: RequestHandler = (req, res) => {
  // TODO: clear BOTH cookies ('accessToken' and 'refreshToken') and send a message
  //       (hint: res.clearCookie(...).clearCookie(...).json(...))
};
