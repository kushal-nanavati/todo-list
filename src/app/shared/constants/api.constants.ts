import { ToDoTask } from "../models/task.model";

const baseApiUrl = 'http://localhost:4000';

export const ApiConstants = {
    getAllTasks: (): string => `${baseApiUrl}/api/todos`,
    postTask: (): string => `${baseApiUrl}/api/todos`
};