import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import UserValidator from '../validators/user.validator';
import { authMiddleware } from '../middlewares/auth.middleware';
import { withAuthUserAndToken } from '../utils/request-handler';

const router = Router();
router.use(authMiddleware.checkAccessToken);
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getAllUsers);
router.get(
  '/me',
  withAuthUserAndToken(userController.getMe)
);
router.patch(
  '/me',
  commonMiddleware.validateBody(UserValidator.userUpdateValidationSchema),
  withAuthUserAndToken(userController.patchMe)
);
router.delete(
  '/me',
  withAuthUserAndToken(userController.deleteMe)
);
router.get(
  '/:userId',
  commonMiddleware.isIdValid('userId'),
  withAuthUserAndToken(userController.getUserById)
);

export const userRouter = router;
