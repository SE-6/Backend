import { agentChat, agentSupport, agentWeather } from '#controllers';
import { Router } from 'express';

const agentRouter = Router();

agentRouter.post('/chat', agentChat);
agentRouter.post('/weather', agentWeather);
agentRouter.post('/support', agentSupport);

export default agentRouter;
