import { agentSupport } from '#controllers';
import { Router } from 'express';

const agentRouter = Router();

agentRouter.post('/support', agentSupport);

export default agentRouter;
