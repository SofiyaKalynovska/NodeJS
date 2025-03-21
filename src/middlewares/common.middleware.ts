import { isObjectIdOrHexString } from 'mongoose';
import { ApiError } from '../errors/api-error';
import { NextFunction, Request, Response } from 'express';

class CommonMiddleware {
  public isIdValid (key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];
        if (!isObjectIdOrHexString(id)) {
          throw new ApiError(`Invalid ID ${[key]}`, 400);
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }
  public validateBody (fields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const dto: any = req.body;
        fields.forEach((field) => {
          if (!dto?.[field]) {
            throw new ApiError(`${field} is required`, 400);
          }
          if (field === 'email' && !dto.email.includes('@')) {
            throw new ApiError('Invalid email', 400);
          }
          if (field === 'password' && dto.password.length < 8) {
            throw new ApiError(
              'Password must be at least 8 characters long',
              400
            );
          }
        });

        (req.body as any) = dto;
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
