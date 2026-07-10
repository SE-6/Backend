import { Router } from 'express';
import { responseApi, generateImage } from '#controllers';

const aiRouter = Router();

aiRouter.post('/chat', responseApi);
aiRouter.post('/image', generateImage);

export default aiRouter;
