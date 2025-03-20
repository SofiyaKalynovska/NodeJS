export interface IUser {
    _id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    role: string;
    phone?: string;
    registrationDate: string;
    isDelete: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;

}

export type IUserDto = Pick<IUser, 'name' | 'email' | 'password'>;

