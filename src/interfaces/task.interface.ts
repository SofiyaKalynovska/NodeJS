export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: string;
    required: boolean;
    ref: 'User'
}

export type ITaskDto = Partial<ITask>;