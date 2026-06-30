import { login, logout, me, register } from '#controllers';
import { authenticate, refresh, validateBodyZod } from '#middlewares';
import { loginSchema, registerSchema } from '#schemas';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', validateBodyZod(registerSchema), register);
authRouter.post('/login', validateBodyZod(loginSchema), login);
authRouter.post('/refresh', refresh);
authRouter.delete('/logout', logout);
authRouter.get('/me', authenticate, me); // protected

export default authRouter;
