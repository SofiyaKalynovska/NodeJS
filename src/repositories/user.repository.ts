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
    return await User.findById(id);
  }

  public async patchUser (userId: string, dto: IUserDto): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteUser (userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
}
export const userRepository = new UserRepository();
