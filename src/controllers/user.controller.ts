import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { IResponseWithTokenPayload } from '../interfaces/token.interface';
import { IRequestWithUser } from '../interfaces/user.interface';

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
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await userService.getUserById(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getUserById:', error);
      next(error);
    }
  }

  public async getMe (
    req: IRequestWithUser,
    res: IResponseWithTokenPayload,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  public async patchMe (req: IRequestWithUser, res: IResponseWithTokenPayload, next: NextFunction) {
    try {
      const tokenPayload = res.locals.tokenPayload;
      const dto = req.body;
      const result = await userService.patchMe(tokenPayload, dto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteMe (req: IRequestWithUser, res: IResponseWithTokenPayload, next: NextFunction): Promise<void> {
    try {
      const tokenPayload = res.locals.tokenPayload;
      await userService.deleteMe(tokenPayload);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
