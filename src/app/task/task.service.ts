import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  create(taskData: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, taskData);
  }

  update(id: number, taskData: any): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, taskData);
  }

  delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.baseUrl}/${id}`);
  }

  getTasksByColumn(columnId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/getTasksByColumn/${columnId}`);
  }
}
