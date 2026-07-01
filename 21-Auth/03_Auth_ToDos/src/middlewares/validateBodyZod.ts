import type { RequestHandler } from 'express';
import type { ZodObject } from 'zod/v4';

// Reusable factory: validates req.body against a Zod schema before the controller runs.
const validateBodyZod =
  (schema: ZodObject): RequestHandler =>
  (req, res, next) => {
    // TODO: parse req.body with schema.safeParse(...)
    // TODO: failed -> res.status(400).json({ message: 'Validation failed', issues })
    //       (map each error to { path, message })
    // TODO: ok -> overwrite req.body with the clean parsed data, then next()
  };

export default validateBodyZod;
