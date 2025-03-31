import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import UserValidator from '../validators/user.validator';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware.checkAccessToken);
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getAllUsers);
router.get(
  '/me',
  userController.getMe
);
router.patch(
  '/me',
  commonMiddleware.validateBody(UserValidator.userUpdateValidationSchema),
  userController.patchMe
);
router.delete(
  '/me',
  userController.deleteMe
);
router.get(
  '/:userId',
  commonMiddleware.isIdValid('userId'),
  userController.getUserById
);

export const userRouter = router;
