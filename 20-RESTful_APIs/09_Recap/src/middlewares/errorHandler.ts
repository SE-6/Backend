import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const status = Number((err as any).cause?.status) || 500;
  res.status(status).json({ message: err.message });
};

export default errorHandler;
