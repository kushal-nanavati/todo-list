import { ToDoTask } from "../models/task.model";

const baseApiUrl = 'http://localhost:4000';

export const ApiConstants = {
    getAllTasks: (): string => `${baseApiUrl}/api/todos`,
    postTask: (): string => `${baseApiUrl}/api/todos`,
    deleteTask: (): string => `${baseApiUrl}/api/todos`,
    postUser: (): string => `${baseApiUrl}/api/register`,
    postLoggedUser: (): string => `${baseApiUrl}/api/login`
};