import { isObjectIdOrHexString } from 'mongoose';
import { ApiError } from '../errors/api-error';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

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

  //If i dont have mongoose validation in model - i will use body validation
  public validateBody (validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = await validator.validate(req.body);
        if (error) {
          throw new ApiError(error.details.map(d => d.message).join(', '), 400);
        }

        // req.body = validatedData;

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
