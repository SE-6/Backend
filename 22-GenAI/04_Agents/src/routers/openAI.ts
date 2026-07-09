import { timeToolCall, webSearchToolCall } from '#controllers';
import { Router } from 'express';

const openAIRouter = Router();

openAIRouter.post('/tool/time', timeToolCall);
openAIRouter.post('/tool/search', webSearchToolCall);

export default openAIRouter;
