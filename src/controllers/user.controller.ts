import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

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

  public async patchUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const dto = req.body;
      const result = await userService.patchUser(userId, dto);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public async deleteUser (req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
