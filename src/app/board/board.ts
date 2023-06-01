import { Column } from "../column/column";

export interface Board {
    id: number;
    name: string;
    description: string;
    columns: Column [];
  }