import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Column } from './column';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private apiUrl = environment.apiUrl;
  private baseUrl = 'columns';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/${this.baseUrl}`);
  }

  getById(id: number): Observable<Column> {
    return this.http.get<Column>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(columnData: Column): Observable<Column> {
    return this.http.post<Column>(`${this.apiUrl}/${this.baseUrl}`, columnData);
  }

  update(id: number, columnData: Column): Observable<Column> {
    return this.http.put<Column>(`${this.apiUrl}/${this.baseUrl}/${id}`, columnData);
  }

  delete(id: number): Observable<Column> {
    return this.http.delete<Column>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  getColumnsByBoard(boardId: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/${this.baseUrl}/getColumnsByBoard/${boardId}`);
  }
}
