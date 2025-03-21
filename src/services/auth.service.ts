import { ApiError } from '../errors/api-error';
import { IUser } from '../interfaces/user.interface';
import { userRepository } from '../repositories/user.repository';
import { passwordService } from './password.service';
import { userService } from './user.service';

class AuthService {
  public async signUp (dto: IUser): Promise<IUser> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    return await userRepository.createUser({ ...dto, password });
  }

  public async signIn (dto: any): Promise<any> {
    const user = await userRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = await passwordService.comparePasswords(
      dto.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError('Invalid email or password', 401);
    }
  }

}

export const authService = new AuthService();
