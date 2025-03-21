import { ApiError } from '../errors/api-error';
import { IUser, IUserUpdateDto } from '../interfaces/user.interface';
import { userRepository } from '../repositories/user.repository';
import { passwordService } from './password.service';

class UserService {
  public async getAllUsers (): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async createUser (dto: IUser): Promise<IUser> {
    await this.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.createUser({ ...dto, password });
  }

  public async getUserById (userId: string): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async patchUser (
    userId: string,
    dto: IUserUpdateDto
  ): Promise<IUser | null> {
    return await userRepository.patchUser(userId, dto);
  }

  public async deleteUser (userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  private async isEmailUnique (email: string): Promise<void> {
    const user = await userRepository.getUserByEmail(email);
    if (user) {
      throw new ApiError('Email already exists', 409);
    }
  }
}

export const userService = new UserService();
