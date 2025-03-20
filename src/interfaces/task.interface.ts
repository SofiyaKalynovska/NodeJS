
export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: string;
    required: boolean;
    owner: string | null;
}

export type ITaskDto = Partial<ITask>;