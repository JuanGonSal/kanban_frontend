import { Task } from "../task/task";

export interface Column {
    id: number;
    name: string;
    order: number;
    board_id: number;
    tasks: Task[];
  }