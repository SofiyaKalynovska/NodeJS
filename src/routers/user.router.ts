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
  authMiddleware.checkRefreshToken,
  userController.getMe
);
router.patch(
  '/me',
  authMiddleware.checkAccessToken,
  authMiddleware.checkRefreshToken,
  commonMiddleware.validateBody(UserValidator.userUpdateValidationSchema),
  userController.patchMe
);
router.delete(
  '/me',
  authMiddleware.checkAccessToken,
  authMiddleware.checkRefreshToken,
  userController.deleteMe
);
router.get(
  '/:userId',
  authMiddleware.checkAccessToken,
  commonMiddleware.isIdValid('userId'),
  userController.getUserById
);

export const userRouter = router;
