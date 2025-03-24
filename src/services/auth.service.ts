import { ApiError } from '../errors/api-error';
import { ITokenPair } from '../interfaces/token.interface';
import { IUser, IUserCreateDto } from '../interfaces/user.interface';
import { tokenRepository } from '../repositories/token.repository';
import { userRepository } from '../repositories/user.repository';
import { passwordService } from './password.service';
import { tokenService } from './token.service';
import { userService } from './user.service';

class AuthService {
  public async signUp (
    dto: IUserCreateDto
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role
    });
    await tokenRepository.createToken({ ...tokens, _userId: user._id });
    return { user: user, tokens: tokens };
  }

  public async signIn (dto: any): Promise<{ user: IUser; tokens: ITokenPair }> {
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
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role
    });
    await tokenRepository.createToken({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
}

export const authService = new AuthService();
