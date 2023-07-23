import { Rol } from "./rol";
import { Team } from "./team";

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Rol[];
    teams: Team[];
    token?: string;
    editando: boolean;
}