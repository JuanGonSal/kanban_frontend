import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from './board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = environment.apiUrl;
  private baseUrl = 'boards';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.apiUrl}/${this.baseUrl}`);
  }

  getById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(boardData: Board): Observable<Board> {
    return this.http.post<Board>(`${this.apiUrl}/${this.baseUrl}`, boardData);
  }

  update(id: number, boardData: Board): Observable<Board> {
    return this.http.put<Board>(`${this.apiUrl}/${this.baseUrl}/${id}`, boardData);
  }

  delete(id: number): Observable<Board> {
    return this.http.delete<Board>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }
}