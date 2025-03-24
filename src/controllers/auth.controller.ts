import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ILogin, IUserCreateDto } from '../interfaces/user.interface';
import { ITokenPayload } from '../interfaces/token.interface';

class AuthController {
  public async signUp (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreateDto;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async signIn (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ILogin;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async refresh (req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload as ITokenPayload;
      const refreshToken = res.locals.refreshToken as string;
      if (!refreshToken) {
        throw new Error('No refresh token provided');
      }
      const result = await authService.refresh(tokenPayload, refreshToken);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
