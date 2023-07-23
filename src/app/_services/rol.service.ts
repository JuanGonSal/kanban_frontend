import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Rol } from '../_models/rol';

@Injectable({ providedIn: 'root' })
export class RolService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Rol>(`${environment.apiUrl}/roles`);
    }

    getById(id: number) {
        return this.http.get<Rol>(`${environment.apiUrl}/roles/${id}`);
    }
}