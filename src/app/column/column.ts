import { Task } from "../task/task";

export interface Column {
    id: number;
    name: string| null;
    order: number | null;
    board_id: number;
    tasks: Task[];
  }