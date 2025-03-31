import { taskRepository } from '../repositories/task.repository';
import { ITask, ITaskDto } from '../interfaces/task.interface';
import { userRepository } from '../repositories/user.repository';

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
      throw new Error('Task not found');
    }
    return task;
  }

  public async getTasksByUserId (userId: string): Promise<ITask[]> {
    return await taskRepository.getTasksByUserId(userId);
  }

  public async updateTask (taskId: string, dto: ITaskDto): Promise<ITask> {
    const updatedTask = await taskRepository.updateTask(taskId, dto);
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  }

  public async deleteTask (taskId: string): Promise<void> {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    const owner = task.owner
      ? await userRepository.getUserById(task.owner)
      : null;

    if (owner) {
      await userRepository.patchUser(owner._id, {
        $pull: { tasks: taskId }
      });
    }
    await taskRepository.deleteTask(taskId);
  }
}

export const taskService = new TaskService();
