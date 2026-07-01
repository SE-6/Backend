import { z } from 'zod/v4';

// TODO: build registerSchema
//   - firstName: string, at least 2 chars
//   - lastName:  string, at least 2 chars
//   - email:     a valid email        (hint: z.email('...'))
//   - password:  string, at least 6 chars
//   - .strict()  -> reject any unknown/extra fields (e.g. an injected "roles": ["admin"])
//
// Pass a custom message as the 2nd arg, e.g. z.string().min(2, 'firstName must be ...').
export const registerSchema = z
  .object({
    // TODO
  })
  .strict();

// TODO: build loginSchema
//   - email:    a valid email
//   - password: string, at least 1 char (just "required" — we don't reveal length rules here)
//   - .strict()
export const loginSchema = z
  .object({
    // TODO
  })
  .strict();
