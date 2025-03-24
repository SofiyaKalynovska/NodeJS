import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { ITokenPayload } from '../interfaces/token.interface';

class UserController {
  public async getAllUsers (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAllUsers();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getUserById (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const result = await userService.getUserById(userId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async getMe (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tokenPayload = req.res?.locals.tokenPayload as ITokenPayload;
      const result = await userService.getMe(tokenPayload);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async patchMe (req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res?.locals.tokenPayload as ITokenPayload;
      const dto = req.body;
      const result = await userService.patchMe(tokenPayload, dto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteMe (req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res?.locals.tokenPayload as ITokenPayload;
      await userService.deleteMe(tokenPayload);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
