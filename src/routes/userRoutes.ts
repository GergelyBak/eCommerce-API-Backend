import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

import { validate } from '../middleware/validate';
import { userSchema } from '../schema/userSchema';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validate(userSchema), createUser);
router.put('/:id', validate(userSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
