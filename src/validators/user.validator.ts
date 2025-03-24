import Joi from 'joi';
import { RoleEnum } from '../enums/role.enum';
import { ILogin, IUserCreateDto, IUserUpdateDto } from '../interfaces/user.interface';
import { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '../constants/regex.constant';

class UserValidator {
  private static nameValidation () {
    return Joi.string().min(3).required().messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name must be at least 3 characters long',
      'any.required': 'Name is required'
    });
  }

  private static emailValidation () {
    return Joi.string().pattern(EMAIL_REGEX).required().messages({
      'string.base': 'Email should be a string',
      'string.pattern.base': 'Email must be a valid email address',
      'any.required': 'Email is required'
    });
  }

  private static passwordValidation () {
    return Joi.string().pattern(PASSWORD_REGEX).required().messages({
      'string.base': 'Password should be a string',
      'string.pattern.base': 'Password must be at least 8 characters long and contain at least one letter and one number',
      'any.required': 'Password is required'
    });
  }

  private static roleValidation () {
    return Joi.string().valid(...Object.values(RoleEnum)).optional().default(RoleEnum.USER).messages({
      'string.base': 'Role must be a string',
      'any.only': `Role must be one of the following: ${Object.values(RoleEnum).join(', ')}`
    });
  }

  private static phoneValidation () {
    return Joi.string().pattern(PHONE_REGEX).optional().messages({
      'string.base': 'Phone number should be a string',
      'string.pattern.base': 'Phone number must be a valid 10-digit phone number'
    });
  }

  public static userCreateValidationSchema = Joi.object({
    name: this.nameValidation(),
    email: this.emailValidation(),
    password: this.passwordValidation(),
    phone: this.phoneValidation(),
    role: this.roleValidation()
  });

  public static userUpdateValidationSchema = Joi.object({
    name: this.nameValidation().optional(),
    email: this.emailValidation().optional(),
    password: this.passwordValidation().optional(),
    phone: this.phoneValidation(),
    role: this.roleValidation().optional(),
    isDelete: Joi.boolean().optional().messages({
      'boolean.base': 'isDelete must be a boolean'
    }),
    isVerified: Joi.boolean().optional().messages({
      'boolean.base': 'isVerified must be a boolean'
    })
  });
  public static userLoginValidationSchema = Joi.object({
    email: this.emailValidation().required(),
    password: this.passwordValidation().required()
  });

  public static validateCreateData (data: IUserCreateDto) {
    return this.userCreateValidationSchema.validateAsync(data);
  }

  public static validateUpdateData (data: IUserUpdateDto) {
    return this.userUpdateValidationSchema.validateAsync(data);
  }

  public static validateLoginData (data: ILogin) {
    return this.userLoginValidationSchema.validateAsync(data);
  }
}

export default UserValidator;
