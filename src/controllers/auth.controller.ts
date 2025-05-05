import { NextFunction, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { ILogin, IUserCreateDto } from '../interfaces/user.interface';
import { ITokenPayload } from '../interfaces/token.interface';
import { ApiError } from '../errors/api-error';

class AuthController {
  public async signUp (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreateDto;
      if (!dto.email || !dto.password) {
        throw new ApiError('Email and password are required', 400);
      }
      const result = await authService.signUp(dto);
      if (!result) {
        throw new ApiError('Something went wrong during sign up', 500);
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  public async signIn (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as ILogin;
      if (!dto.email || !dto.password) {
        throw new ApiError('Email and password are required', 400);
      }
      const result = await authService.signIn(dto);
      if (!result) {
        throw new ApiError('Something went wrong during sign in', 500);
      }
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
        throw new ApiError('No refresh token provided', 400);
      }

      if (!tokenPayload || !tokenPayload.userId) {
        throw new ApiError('Invalid token payload', 400);
      }

      const result = await authService.refresh(tokenPayload, refreshToken);
      if (!result) {
        throw new ApiError('Failed to refresh token', 500);
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async logout (req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload as ITokenPayload;
      const tokenId = res.locals.tokenId as string;

      if (!tokenPayload || !tokenPayload.userId) {
        throw new ApiError('Invalid token payload', 400);
      }

      const result = await authService.logout(tokenPayload.userId, tokenId);


      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public async logoutAll (req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload as ITokenPayload;

      if (!tokenPayload || !tokenPayload.userId) {
        throw new ApiError('Invalid token payload', 400);
      }

      const result = await authService.logoutAll(tokenPayload.userId);


      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}



export const authController = new AuthController();
