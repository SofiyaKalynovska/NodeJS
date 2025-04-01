import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/api-error';
import { taskService } from '../services/task.service';
import { IRequestWithUser } from '../interfaces/user.interface';

class TaskController {
  public async createTask (
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskData = req.body;
      const user = req;
      const task = await taskService.createTask({
        ...taskData,
        owner: user.user._id
      });
      res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
      next(error);
    }
  }

  public async getAllTasks (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  }

  public async getTaskById (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const task = await taskService.getTaskById(taskId);
      if (!task) {
        throw new ApiError('Task not found', 404);
      }
      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  }

  public async getTasksByUserId (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const tasks = await taskService.getTasksByUserId(userId);
      res.status(200).json({ tasks });
    } catch (error) {
      next(error);
    }
  }

  public async updateTask (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const taskData = req.body;
      const updatedTask = await taskService.updateTask(taskId, taskData);
      if (!updatedTask) {
        throw new ApiError('Something went wrong during update', 404);
      }
      res
        .status(200)
        .json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
      next(error);
    }
  }

  public async deleteTask (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { taskId } = req.params;
      const user = (req as IRequestWithUser).user;
      console.log('user = (req as IRequestWithUser)', user);
      if (!user) {
        throw new ApiError('User not found in the request', 401);
      }
      await taskService.deleteTask(taskId, user._id);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
