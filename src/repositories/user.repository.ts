import { UpdateQuery } from 'mongoose';
import { IUser, IUserCreateDto, IUserUpdateDto } from '../interfaces/user.interface';
import { User } from '../models/user.model';

class UserRepository {
  public async getAllUsers (): Promise<IUser[]> {
    return await User.find();
  }

  public async createUser (dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }

  public async getUserById (id: string): Promise<IUser | null> {
    const user = await User.findById(id).populate('tasks');
    return user;
  }

  public async patchUser (userId: string, dto: UpdateQuery<IUserUpdateDto>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async getMe (id: string): Promise<IUser | null> {
    const user = await User.findById(id).populate('tasks');
    return user;
  }
  public async patchMe (userId: string, dto: UpdateQuery<IUserUpdateDto>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteUserById (userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }

  public async getUserByEmail (email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
}
export const userRepository = new UserRepository();
