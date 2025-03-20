import { NextFunction, Request, Response, Router } from 'express';
import { userController } from '../controllers/user.controller';
import { ApiError } from '../errors/api-error';

const validateUserData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body;
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError('Name and email are required', 400);
    }
    if (!dto.email || !dto.email.includes('@')) {
      throw new ApiError('Invalid email', 400);
    }
    if (!dto.password || dto.password.length < 8) {
      throw new ApiError('Password must be at least 8 characters long', 400);
    }
    req.body = dto;
    next();
  } catch (error) {
    next(error);
  }
};

const router = Router();
// / because in main we are importing userRouter for '/user' endpoint
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', validateUserData, userController.createUser);
router.patch('/:userId', validateUserData, userController.patchUser);
router.delete('/:userId', userController.deleteUser);

export const userRouter = router;
