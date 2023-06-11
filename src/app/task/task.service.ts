import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  private baseUrl = 'tasks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${this.baseUrl}`);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(taskData: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${this.baseUrl}`, taskData);
  }

  update(id: number, taskData: any): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${this.baseUrl}/${id}`, taskData);
  }

  delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  getTasksByColumn(columnId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${this.baseUrl}/getTasksByColumn/${columnId}`);
  }
}
