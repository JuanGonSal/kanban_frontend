import { Team } from "src/app/_models/team";
import { Column } from "../column/column";

export interface Board {
    id: number;
    name: string | null;
    description: string | null;
    columns: Column [];
    team: Team,
    editando?: boolean | null;
  }