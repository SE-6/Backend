import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console log only in development
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  const status = (err.cause as { status?: number })?.status ?? 500;

  res.status(status).json({ message: err.message || 'Internal Server error' });
};

export default errorHandler;
