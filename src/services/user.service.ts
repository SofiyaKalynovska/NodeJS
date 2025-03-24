import { ApiError } from '../errors/api-error';
import { ITokenPayload } from '../interfaces/token.interface';
import { IUser, IUserUpdateDto } from '../interfaces/user.interface';
import { userRepository } from '../repositories/user.repository';


class UserService {
  public async getAllUsers (): Promise<IUser[]> {
    return await userRepository.getAllUsers();
  }

  public async getUserById (userId: string): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async getMe (tokenPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getMe(tokenPayload.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async patchMe (
    tokenPayload: ITokenPayload,
    dto: IUserUpdateDto
  ): Promise<IUser | null> {
    return await userRepository.patchMe(tokenPayload.userId, dto);
  }

  public async deleteMe (tokenPayload: ITokenPayload): Promise<void> {
    await userRepository.deleteUserById(tokenPayload.userId);
  }

  public async isEmailUnique (email: string): Promise<void> {
    const user = await userRepository.getUserByEmail(email);
    if (user) {
      throw new ApiError('Email already exists', 409);
    }
  }
}

export const userService = new UserService();
