import Joi from 'joi';
import { TaskStatusEnum } from '../enums/taskStatus.enum';

class TaskValidator {
  public static createSchema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.base': 'Title should be a string',
      'string.min': 'Title must be at least 3 characters long',
      'any.required': 'Title is required'
    }),
    description: Joi.string().min(10).required().messages({
      'string.base': 'Description should be a string',
      'string.min': 'Description must be at least 10 characters long',
      'any.required': 'Description is required'
    }),
    status: Joi.string().valid(...Object.values(TaskStatusEnum)).optional().messages({
      'string.base': 'Status must be a string',
      'any.only': `Status must be one of the following: ${Object.values(TaskStatusEnum).join(', ')}`
    }),
    required: Joi.boolean().required().messages({
      'boolean.base': 'The "required" field must be a boolean',
      'any.required': 'The "required" field is mandatory'
    })
  });

  public static patchSchema = Joi.object({
    title: Joi.string().min(3).optional().messages({
      'string.base': 'Title should be a string',
      'string.min': 'Title must be at least 3 characters long'
    }),
    description: Joi.string().min(10).optional().messages({
      'string.base': 'Description should be a string',
      'string.min': 'Description must be at least 10 characters long'
    }),
    status: Joi.string().valid(...Object.values(TaskStatusEnum)).optional().messages({
      'string.base': 'Status must be a string',
      'any.only': `Status must be one of the following: ${Object.values(TaskStatusEnum).join(', ')}`
    }),
    required: Joi.boolean().optional().messages({
      'boolean.base': 'The "required" field must be a boolean'
    })
  });
}

export { TaskValidator };
