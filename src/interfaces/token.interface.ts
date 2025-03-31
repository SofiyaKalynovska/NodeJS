import { RoleEnum } from '../enums/role.enum';
import { Response } from 'express';
export interface IToken {
  _id: string;
  _userId: string;
  refreshToken: string;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokenPayload {
  userId: string;
  role: RoleEnum;
}

export type ITokenPair = Pick<IToken, 'accessToken' | 'refreshToken'>;

export type ITokenDto = ITokenPair & { _userId: string };

export interface IResponseWithTokenPayload extends Response {
  locals: {
    tokenPayload: ITokenPayload;
  };
}