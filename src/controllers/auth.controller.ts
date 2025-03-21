import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { IUser } from '../interfaces/user.interface';

class AuthController {
  public async signUp (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async signIn (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
