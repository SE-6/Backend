import { Router } from 'express';
import { claudeChat } from '#controllers';

const claudeRouter = Router();

claudeRouter.post('/chat', claudeChat);

export default claudeRouter;
