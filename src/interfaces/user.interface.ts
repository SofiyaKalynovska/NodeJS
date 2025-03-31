import { RoleEnum } from '../enums/role.enum';
import { ITask } from './task.interface';
import { Request } from 'express';


export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: RoleEnum;
  phone?: string;
  isDelete: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  tasks: ITask[] | null;
}

export type IUserCreateDto = Pick<
  IUser,
  'name' | 'email' | 'password' | 'phone' | 'role'
>;

export type IUserUpdateDto = Pick<
  IUser,
  'name' | 'email' | 'password' | 'phone' | 'role' | 'isDelete' | 'isVerified'
>;

export type ILogin = Pick<IUser, 'email' | 'password'>;

export interface IRequestWithUser extends Request {
  user: IUser;
}
