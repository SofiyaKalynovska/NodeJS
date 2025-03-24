import * as jwt from 'jsonwebtoken';
import { config } from '../configs/config';
import { ITokenPair, ITokenPayload } from '../interfaces/token.interface';
import { ApiError } from '../errors/api-error';
class TokenService {
  public generateToken (payload: ITokenPayload): ITokenPair {
    const {
      jwtAccessSecret,
      jwtRefreshSecret,
      jwtAccessExpiresIn,
      jwtRefreshExpiresIn
    } = config;

    const accessToken = jwt.sign(
      payload,
      jwtAccessSecret as unknown as jwt.Secret,
      {
        expiresIn: jwtAccessExpiresIn as any
      }
    );
    const refreshToken = jwt.sign(
      payload,
      jwtRefreshSecret as unknown as jwt.Secret,
      {
        expiresIn: jwtRefreshExpiresIn as any
      }
    );
    return { accessToken, refreshToken };
  }

  public verifyToken (token: string, type: 'access' | 'refresh'): ITokenPayload {
    try {
      let secret: string | undefined;
      switch (type) {
      case 'access':
        secret = config.jwtAccessSecret;
        break;
      case 'refresh':
        secret = config.jwtRefreshSecret;
        break;
      default:
        throw new ApiError('Invalid token type', 401);
      }
      return jwt.verify(
        token,
        secret as unknown as jwt.Secret
      ) as ITokenPayload;
    } catch {
      throw new ApiError('Invalid token', 401);
    }
  }
}

export const tokenService = new TokenService();
