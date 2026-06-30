import type { RequestHandler } from 'express';
import type { ZodObject } from 'zod';

const validateBodyZod =
  (schema: ZodObject): RequestHandler =>
  (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => ({
        path: i.path.join(),
        message: i.message,
      }));

      return res.status(400).json({ message: 'Validation failed', issues });
    }

    req.body = parsed.data;
    next();
  };

export default validateBodyZod;
