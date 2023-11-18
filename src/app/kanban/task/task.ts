import { Tag } from "../tag/tag";
export interface Task {
  id: number;
  title?: string | null;
  description?: string | null;
  order: number;
  limit: any;
  column_id: number;
  tags?: Tag[];
  created_at: any;
  created_by: any;
  assigned_to: any,
  created_user_id: any;
  assigned_user_id: any;
}