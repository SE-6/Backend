import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '#controllers';
import { validateBodyZod } from '#middlewares';
import { userInputSchema } from '#schemas';

import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', validateBodyZod(userInputSchema), createUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', validateBodyZod(userInputSchema), updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
