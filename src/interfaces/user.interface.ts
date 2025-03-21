import { ITask } from './task.interface';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    isDelete: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    tasks: ITask[] | null;

}

export type IUserCreateDto = Pick<IUser, 'name' | 'email' | 'password' | 'phone' | 'role'>;

export type IUserUpdateDto = Pick<IUser, 'name' | 'email' | 'password' | 'phone' | 'role' | 'isDelete' | 'isVerified'>;

