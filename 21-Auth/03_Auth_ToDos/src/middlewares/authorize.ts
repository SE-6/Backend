import type { RequestHandler } from 'express';

// Only the post's owner (or an admin) may edit/delete it. Runs after authenticate.
const authorize: RequestHandler = async (req, res, next) => {
  // TODO: find the post by req.params.id; not found -> next(404)
  // TODO: admins pass through  (req.user?.roles includes 'admin')
  // TODO: otherwise post.author must equal req.user?.id, else next(403 'Forbidden')
  // TODO: ok -> next()
};

export default authorize;
