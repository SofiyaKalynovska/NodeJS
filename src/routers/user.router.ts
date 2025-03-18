import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:userId', userController.patchUser);
router.delete('/:userId', userController.deleteUser);

export const userRouter = router;