import * as jwt from 'jsonwebtoken';
import { config } from '../configs/config';
import { ITokenPair, ITokenPayload } from '../interfaces/token.interface';
import { ApiError } from '../errors/api-error';
import { TokenTypeEnum } from '../enums/tokenType.enum';
class TokenService {
  public generateToken (payload: ITokenPayload): ITokenPair {
    try {
      const {
        jwtAccessSecret,
        jwtRefreshSecret,
        jwtAccessExpiresIn,
        jwtRefreshExpiresIn
      } = config;

      if (!jwtAccessSecret || !jwtRefreshSecret) {
        throw new ApiError('JWT secret keys are missing in the config', 500);
      }

      if (!payload || typeof payload !== 'object' || !payload.userId) {
        throw new ApiError('Invalid payload for token generation', 400);
      }

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
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new ApiError('Error generating JWT tokens', 500);
      }
    }
  }

  public verifyToken (token: string, type: TokenTypeEnum): ITokenPayload {
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

  public checkToken (token: string, type: TokenTypeEnum): ITokenPayload {
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

      const decoded = jwt.verify(token, secret as unknown as jwt.Secret);
      return decoded as ITokenPayload;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError('Invalid token', 401);
      } else if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError('Token expired', 401);
      } else {
        throw new ApiError('Token verification failed', 500);
      }
    }
  }
}

export const tokenService = new TokenService();
