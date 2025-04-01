import { Request, Response, NextFunction } from 'express';
import { IRequestWithUser } from '../interfaces/user.interface';
import { IResponseWithTokenPayload } from '../interfaces/token.interface';

function hasUser (req: Request): req is IRequestWithUser {
  return 'user' in req && req.user !== undefined;
}

export const withAuthUser = (
  handler: (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) => Promise<void> | void
): ((
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!hasUser(req)) {
      res.status(401).json({ error: 'Unauthorized: Missing user data' });
      return;
    }
    handler(req, res, next);
  };
};

export const withAuthUserAndToken = (
  handler: (
    req: IRequestWithUser,
    res: IResponseWithTokenPayload,
    next: NextFunction
  ) => Promise<void> | void
): ((
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!hasUser(req)) {
      res.status(401).json({
        error: 'Unauthorized access. User data is missing or invalid.',
        message: 'You must be logged in to access this resource.',
        statusCode: 401
      });
      return;
    }

    try {
      const tokenRes = res as unknown as IResponseWithTokenPayload;
      handler(req, tokenRes, next);
    } catch (error) {
      next(error);
    }
  };
};
