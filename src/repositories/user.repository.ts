import { UpdateQuery } from 'mongoose';
import { IUser, IUserDto } from '../interfaces/user.interface';
import { User } from '../models/user.model';

class UserRepository {
  public async getAllUsers (): Promise<IUser[]> {
    return await User.find();
  }

  public async createUser (dto: IUserDto): Promise<IUser> {
    return await User.create(dto);
  }

  public async getUserById (id: string): Promise<IUser | null> {
    const user = await User.findById(id).populate('tasks');
    console.log('user', user);
    return user;
  }

  public async patchUser (userId: string, dto: UpdateQuery<IUserDto>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteUser (userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
}
export const userRepository = new UserRepository();
