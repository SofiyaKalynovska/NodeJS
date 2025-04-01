import { taskRepository } from '../repositories/task.repository';
import { ITask, ITaskDto } from '../interfaces/task.interface';
import { userRepository } from '../repositories/user.repository';
import { ApiError } from '../errors/api-error';
// import { IUser } from '../interfaces/user.interface';

class TaskService {
  public async getAllTasks (): Promise<ITask[]> {
    return await taskRepository.getAllTasks();
  }

  public async createTask (dto: ITask): Promise<ITask> {
    const task = await taskRepository.createTask(dto);

    const owner = task.owner;

    if (owner) {
      await userRepository.patchUser(owner, {
        $push: { tasks: task._id }
      });
    }

    return task;
  }

  public async getTaskById (taskId: string): Promise<ITask> {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
      throw new ApiError('Task not found', 404);
    }
    return task;
  }

  public async getTasksByUserId (userId: string): Promise<ITask[]> {
    return await taskRepository.getTasksByUserId(userId);
  }

  public async updateTask (taskId: string, dto: ITaskDto): Promise<ITask> {
    try {
      const updatedTask = await taskRepository.updateTask(taskId, dto);
      if (!updatedTask) {
        throw new ApiError('Task not found', 404);
      }
      return updatedTask;
    } catch {
      throw new ApiError('An unexpected error occurred', 500);
    }
  }

  public async deleteTask (taskId: string, user: any): Promise<void> {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
      throw new ApiError('Task not found', 404);
    }
    const owner = task.owner
      ? await userRepository.getUserById(task.owner)
      : null;

    if (!owner || owner._id.toString() !== user._id.toString()) {
      throw new ApiError('You are not authorized to delete this task', 403);
    }

    if (owner) {
      await userRepository.patchUser(owner._id, {
        $pull: { tasks: taskId }
      });
    }
    await taskRepository.deleteTask(taskId);
  }
}

export const taskService = new TaskService();
