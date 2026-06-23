import type { RequestHandler } from 'express';

export const getAllArticles: RequestHandler = (req, res) => {
  res.json({ message: 'List of all articles' });
};

export const getArticleById: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Full article content for id: ${id} ` });
};
