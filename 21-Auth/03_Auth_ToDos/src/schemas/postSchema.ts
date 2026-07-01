import { z } from 'zod/v4';

// TODO: build postSchema
//   - title:   string, at least 1 char ('title is required')
//   - content: string, at least 1 char ('content is required')
//   - .strict()
//
// ❗ NO `author` field here. The author always comes from the token (req.user.id),
//    never from the request body — so we don't even accept it as input.
export const postSchema = z
  .object({
    // TODO
  })
  .strict();
