import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import UserValidator from '../validators/user.validator';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getAllUsers);
router.get(
  '/me',
  authMiddleware.checkAccessToken,
  userController.getUserById
);
router.patch(
  '/me',
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(UserValidator.userUpdateValidationSchema),
  userController.patchUser
);
router.delete(
  '/me',
  authMiddleware.checkAccessToken,
  userController.deleteUser
);
router.get(
  '/:userId',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('userId'),
  userController.getUserById
);

export const userRouter = router;
