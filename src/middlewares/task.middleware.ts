import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api-error';

export const validateTaskData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body;

    if (!dto.title || dto.title.length < 3) {
      throw new ApiError('Title is required and must be at least 3 characters long', 400);
    }

    if (!dto.description || dto.description.length < 10) {
      throw new ApiError('Description is required and must be at least 10 characters long', 400);
    }

    if (dto.status && !['pending', 'in-progress', 'completed'].includes(dto.status)) {
      throw new ApiError('Invalid task status', 400);
    }

    if (dto.required === undefined) {
      throw new ApiError('The "required" field is mandatory', 400);
    }

    req.body = dto;
    next();
  } catch (error) {
    next(error);
  }
};
