import { Board } from "../board/board";
export interface BoardList {
    id: number;
    boards: Board [];
    editando?: boolean | null;
  }