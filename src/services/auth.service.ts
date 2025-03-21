import { ApiError } from '../errors/api-error';
import { userRepository } from '../repositories/user.repository';
import { passwordService } from './password.service';

class AuthService {
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
