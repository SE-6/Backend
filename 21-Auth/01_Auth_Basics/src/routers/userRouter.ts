import { login, me, register } from '#controllers';
import { authenticate } from '#middlewares';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me', authenticate, me); // protected

export default userRouter;
