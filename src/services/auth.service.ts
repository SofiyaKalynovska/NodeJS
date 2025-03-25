import { config } from '../configs/config';
import { EmailTypeEnum } from '../enums/email-type.enum';
import { ApiError } from '../errors/api-error';
import { ITokenPair, ITokenPayload } from '../interfaces/token.interface';
import { ILogin, IUser, IUserCreateDto } from '../interfaces/user.interface';
import { tokenRepository } from '../repositories/token.repository';
import { userRepository } from '../repositories/user.repository';
import { emailService } from './emai.service';
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
    await emailService.sendEmail(EmailTypeEnum.WELCOME, 'morderium18@gmail.com', { name: user.name, frontUrl: config.frontUrl });
    return { user: user, tokens: tokens };
  }

  public async signIn (
    dto: ILogin
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getUserByEmail(dto.email);
    if (!user) {
      throw new ApiError('Incorrect email or password', 401);
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
  public async refresh (
    tokenPayload: ITokenPayload,
    refreshToken: string
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateToken({
      userId: tokenPayload.userId,
      role: tokenPayload.role
    });
    await tokenRepository.createToken({
      ...tokens,
      _userId: tokenPayload.userId
    });
    return tokens as ITokenPair;
  }
}

export const authService = new AuthService();
