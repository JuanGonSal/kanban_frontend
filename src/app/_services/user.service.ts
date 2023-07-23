import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(        
        private router: Router,
        private http: HttpClient
    ) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(user: User){
        return this.http.post<User>(`${environment.apiUrl}/users/`, user);
    }

    getInactive() {
        return this.http.get<User[]>(`${environment.apiUrl}/users_inactive`);
    }
}