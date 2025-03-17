import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';

class UserController {
  public async getList (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public async createUser (req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
