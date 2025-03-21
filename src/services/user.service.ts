import { IUser, IUserUpdateDto } from '../interfaces/user.interface';
import { userRepository } from '../repositories/user.repository';

class UserService {
  public async getAllUsers (): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async createUser (dto: IUser): Promise<IUser> {
    return await userRepository.createUser(dto);
  }

  public async getUserById (userId: string): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async patchUser (userId: string, dto: IUserUpdateDto): Promise<IUser | null> {
    return await userRepository.patchUser(userId, dto);
  }

  public async deleteUser (userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }
}

export const userService = new UserService();
