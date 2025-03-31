import { ApiError } from '../errors/api-error';
import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../services/token.service';
import { tokenRepository } from '../repositories/token.repository';
import { TokenTypeEnum } from '../enums/tokenType.enum';
import { userRepository } from '../repositories/user.repository';
//For tokens checking (if they are valid)
class AuthMiddleware {
  public async checkAccessToken (req: any, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError('No access token provided', 401);
      }
      const accessToken = token.split('Bearer ')[1];
      if (!accessToken) {
        throw new ApiError('Invalid access token', 401);
      }
      const tokenPayload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);
      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError('Invalid access token', 401);
      }
      res.locals.tokenPayload = tokenPayload;

      if (!pair._userId) {
        throw new ApiError('User with this token not found', 403);
      }

      const user = await userRepository.getUserById(pair._userId.toString());
      if (!user) {
        throw new ApiError('User not found', 404);
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  }
  public async checkRefreshToken (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError('No refresh token provided', 401);
      }
      const refreshToken = token.split('Bearer ')[1];
      if (!refreshToken) {
        throw new ApiError('Invalid refresh token', 401);
      }
      const tokenPayload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH);
      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError('Invalid refresh token', 401);
      }
      res.locals.tokenPayload = tokenPayload;
      res.locals.refreshToken = refreshToken;
      next();
    } catch (error) {
      next(error);
    }

  }
}

export const authMiddleware = new AuthMiddleware();
