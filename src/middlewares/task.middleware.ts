import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';
import { TaskValidator } from '../validators/task.validator'; // Correct import

export const validateTaskData = (req: Request, res: Response, next: NextFunction) => {
  const { method } = req;

  let schema;

  if (method === 'POST') {
    schema = TaskValidator.createSchema;
  } else if (method === 'PATCH') {
    schema = TaskValidator.patchSchema;
  } else {
    return next(new ApiError('Invalid HTTP method for task validation', 405));
  }

  if (!schema) {
    return next(new ApiError('Validation schema not found', 400));
  }

  const { error } = schema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    return next(new ApiError(message, 400));
  }

  next();
};
