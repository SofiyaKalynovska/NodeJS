import { ApiError } from '../errors/api-error';
import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../services/token.service';
import { tokenRepository } from '../repositories/token.repository';
import { TokenTypeEnum } from '../enums/tokenType.enum';
import { userRepository } from '../repositories/user.repository';
import { IRequestWithUser } from '../interfaces/user.interface';

class AuthMiddleware {
  public async checkAccessToken (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError('Invalid or missing access token', 401);
      }
      const accessToken = authHeader.split(' ')[1];

      const tokenPayload = tokenService.checkToken(accessToken, TokenTypeEnum.ACCESS);
      if (!tokenPayload || !tokenPayload.userId) {
        throw new ApiError('Invalid token payload', 401);
      }

      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError('Token not found or revoked', 401);
      }

      const user = await userRepository.getUserById(pair._userId);
      if (!user) {
        throw new ApiError('User not found', 404);
      }

      (req as unknown as IRequestWithUser).user = user;
      res.locals.tokenPayload = tokenPayload;

      next();
    } catch (error) {
      next(error);
    }
  }

  public async checkRefreshToken (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError('Invalid or missing refresh token', 401);
      }
      const refreshToken = authHeader.split(' ')[1];
      if (!refreshToken) {
        throw new ApiError('No refresh token provided', 400);
      }

      const tokenPayload = tokenService.checkToken(refreshToken, TokenTypeEnum.REFRESH);
      if (!tokenPayload) {
        throw new ApiError('Invalid refresh token payload', 401);
      }

      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError('Token not found or revoked', 401);
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
