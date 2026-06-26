import type { RequestHandler } from 'express';
import type { ZodObject } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

const validateBodyZod =
  (schema: ZodObject): RequestHandler =>
  async (req, res, next) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      if (req.file) await cloudinary.uploader.destroy(req.file.filename);

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
