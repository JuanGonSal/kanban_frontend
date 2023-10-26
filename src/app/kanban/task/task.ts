export interface Task {
  id: number;
  title?: string | null;
  description?: string | null;
  order: number;
  column_id: number;
}