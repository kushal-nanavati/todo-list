import { PriorityLevels } from "../enums/priority.enum";

export interface ToDoTask {
    id: number;
    taskName: string;
    priority: PriorityLevels;
    taskDescription: string;
}