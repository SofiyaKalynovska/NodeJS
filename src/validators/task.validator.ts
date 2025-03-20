import Joi from 'joi';

const taskValidationSchema = Joi.object({
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
  status: Joi.string().valid('pending', 'in-progress', 'completed').optional().messages({
    'string.base': 'Status must be a string',
    'any.only': 'Status must be one of the following: "pending", "in-progress", "completed"'
  }),
  required: Joi.boolean().required().messages({
    'boolean.base': 'The "required" field must be a boolean',
    'any.required': 'The "required" field is mandatory'
  })
});

export default taskValidationSchema;