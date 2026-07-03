import { geminiChat } from '#controllers';
import { Router } from 'express';

const geminiRouter = Router();

geminiRouter.post('/chat', geminiChat);

export default geminiRouter;
