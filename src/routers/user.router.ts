import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import UserValidator from '../validators/user.validator';

const router = Router();
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getAllUsers);
router.get(
  '/:userId',
  commonMiddleware.isIdValid('userId'),
  userController.getUserById
);
router.post(
  '/',
  commonMiddleware.validateBody(UserValidator.userCreateValidationSchema),
  userController.createUser
);
router.patch(
  '/:userId',
  commonMiddleware.isIdValid('userId'),
  commonMiddleware.validateBody(UserValidator.userUpdateValidationSchema),
  userController.patchUser
);
router.delete(
  '/:userId',
  commonMiddleware.isIdValid('userId'),
  userController.deleteUser
);

export const userRouter = router;
