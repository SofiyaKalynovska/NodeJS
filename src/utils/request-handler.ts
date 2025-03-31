import { Request, Response, NextFunction } from 'express';
import { IRequestWithUser } from '../interfaces/user.interface';
import { IResponseWithTokenPayload } from '../interfaces/token.interface';

export const withAuthUser = <
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown
>(
    handler: (
    req: IRequestWithUser,
    res: Response<ResBody>,
    next: NextFunction
  ) => Promise<void> | void
  ) => {
  return (
    req: Request<unknown, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ): Promise<void> | void => {
    const authReq = req as unknown as IRequestWithUser;
    return handler(authReq, res, next);
  };
};

export const withAuthUserAndToken = <
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown
>(
    handler: (
    req: IRequestWithUser,
    res: IResponseWithTokenPayload,
    next: NextFunction
  ) => Promise<void> | void
  ) => {
  return (
    req: Request<unknown, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction
  ): Promise<void> | void => {
    const authReq = req as unknown as IRequestWithUser;
    const tokenRes = res as unknown as IResponseWithTokenPayload;
    return handler(authReq, tokenRes, next);
  };
};