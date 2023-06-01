import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from './column';
import { Task } from '../task/task';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private baseUrl = 'http://localhost:8000/api/columns';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Column> {
    return this.http.get<Column>(`${this.baseUrl}/${id}`);
  }

  create(columnData: Column): Observable<Column> {
    return this.http.post<Column>(`${this.baseUrl}`, columnData);
  }

  update(id: number, columnData: Column): Observable<Column> {
    return this.http.put<Column>(`${this.baseUrl}/${id}`, columnData);
  }

  delete(id: number): Observable<Column> {
    return this.http.delete<Column>(`${this.baseUrl}/${id}`);
  }

  getColumnsByBoard(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.baseUrl}/getColumnsByBoard/${boardId}`);
  }
}
