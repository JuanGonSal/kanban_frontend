import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl = 'http://localhost:8000/api/boards';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.baseUrl}/${id}`);
  }

  create(boardData: Board): Observable<Board> {
    return this.http.post<Board>(`${this.baseUrl}`, boardData);
  }

  update(id: number, boardData: Board): Observable<Board> {
    return this.http.put<Board>(`${this.baseUrl}/${id}`, boardData);
  }

  delete(id: number): Observable<Board> {
    return this.http.delete<Board>(`${this.baseUrl}/${id}`);
  }
}