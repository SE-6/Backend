import { generateImage } from '#controllers';
import { Router } from 'express';

const aiRouter = Router();

aiRouter.post('/image', generateImage);

export default aiRouter;
