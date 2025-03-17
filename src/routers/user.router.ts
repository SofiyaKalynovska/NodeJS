import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getList);
router.post('/', userController.createUser);

export const userRouter = router;