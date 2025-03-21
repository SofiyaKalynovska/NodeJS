import { TaskStatusEnum } from '../enums/taskStatus.enum';
import { ITask } from '../interfaces/task.interface';
import { model, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: TaskStatusEnum.PENDING },
    required: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'users' }
  },
  { timestamps: true, versionKey: false }
);

export const Task = model<ITask>('tasks', taskSchema);
