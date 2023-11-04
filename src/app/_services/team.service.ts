import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Team } from '../_models/team';

@Injectable({ providedIn: 'root' })
export class TeamService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Team[]>(`${environment.apiUrl}/teams`);
    }

    getById(id: number) {
        return this.http.get<Team>(`${environment.apiUrl}/teams/${id}`);
    }

    store(team: Team){
        return this.http.post<Team>(`${environment.apiUrl}/teams`, team);
    }

    update(team: Team){
        console.log(team);
        return this.http.put<Team>(`${environment.apiUrl}/teams/${team.id}`, team);
    }

    delete(team: Team){
        console.log(team);
        return this.http.delete<Team>(`${environment.apiUrl}/teams/${team.id}`);
    }
}