import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '#controllers';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
