import { chatCompletion, generateImage, responseApi } from '#controllers';
import { Router } from 'express';

const openAIRouter = Router();

openAIRouter.post('/chat', chatCompletion);
openAIRouter.post('/responses', responseApi);
openAIRouter.post('/image', generateImage);

export default openAIRouter;
