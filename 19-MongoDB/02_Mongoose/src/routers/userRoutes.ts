import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '#controllers';

const userRouter = Router();

// userRouter.get('/', (req, res) => {
//   res.json({ message: 'list of users' });
// });

userRouter.get('/', getAllUsers);
userRouter.post('/', createUser);

userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
