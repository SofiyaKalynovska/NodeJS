import { taskRepository } from '../repositories/task.repository';
import { ITask, ITaskDto } from '../interfaces/task.interface';

class TaskService {
  public async getAllTasks (): Promise<ITask[]> {
    return await taskRepository.getAllTasks();
  }

  public async createTask (dto: ITask): Promise<ITask> {
    return await taskRepository.createTask(dto);
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
    await taskRepository.deleteTask(taskId);
  }
}

export const taskService = new TaskService();
