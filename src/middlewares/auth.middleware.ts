import { ApiError } from '../errors/api-error';
import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../services/token.service';
import { tokenRepository } from '../repositories/token.repository';
//For tokens checking (if they are valid)
class AuthMiddleware {
  public async checkAccessToken (req: Request, res: Response, next: NextFunction) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError('No access token provided', 401);
      }
      const accessToken = header.split('Bearer ')[1];
      if (!accessToken) {
        throw new ApiError('Invalid access token', 401);
      }
      const tokenPayload = tokenService.verifyToken(accessToken, 'access');
      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError('Invalid access token', 401);
      }
      req.res!.locals.tokenPayload = tokenPayload;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
