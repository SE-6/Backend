import type { RequestHandler } from 'express';

const timeLogger: RequestHandler = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleDateString()}`);
  next();
};

export default timeLogger;
