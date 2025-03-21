import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';
import taskValidationSchema from '../validators/task.validator';

export const validateTaskData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = taskValidationSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    return next(new ApiError(message, 400));
  }

  next();
};
