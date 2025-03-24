import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { commonMiddleware } from '../middlewares/common.middleware';
import UserValidator from '../validators/user.validator';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post(
  '/sign-up',
  commonMiddleware.validateBody(UserValidator.userCreateValidationSchema),
  authController.signUp
);
router.post(
  '/sign-in',
  commonMiddleware.validateBody(UserValidator.userLoginValidationSchema),
  authController.signIn
);

router.post(
  '/refresh',
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
