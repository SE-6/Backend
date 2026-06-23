import { getAllArticles, getArticleById } from '#controllers';
import { payWall } from '#middlewares';
import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/', getAllArticles);
articleRouter.get('/:id', payWall, getArticleById);

export default articleRouter;
