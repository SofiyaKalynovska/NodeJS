import { ITask, ITaskDto } from '../interfaces/task.interface';
import { Task } from '../models/task.model';

class TaskRepository {
  public async getAllTasks (): Promise<ITask[]> {
    return await Task.find();
  }

  public async createTask (dto: ITaskDto): Promise<ITask> {
    const task = new Task(dto);
    return await task.save();
  }

  public async getTaskById (taskId: string): Promise<ITask | null> {
    return await Task.findById(taskId);
  }

  public async getTasksByUserId (userId: string): Promise<ITask[]> {
    return await Task.find({ owner: userId }).populate('owner');
  }

  public async updateTask (taskId: string, dto: ITaskDto): Promise<ITask | null> {
    return await Task.findByIdAndUpdate(taskId, dto, { new: true });
  }

  public async deleteTask (taskId: string): Promise<void> {
    await Task.findByIdAndDelete(taskId);
  }
}

export const taskRepository = new TaskRepository();
