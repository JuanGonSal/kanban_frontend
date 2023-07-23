import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardList } from './board-list';

@Injectable({
  providedIn: 'root'
})
export class BoardListService {
  private apiUrl = environment.apiUrl;
  private baseUrl = 'boards';

  constructor(private http: HttpClient) { }

  getAll(): Observable<BoardList[]> {
    return this.http.get<BoardList[]>(`${this.apiUrl}/${this.baseUrl}`);
  }

  getById(id: number): Observable<BoardList> {
    return this.http.get<BoardList>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(boardData: BoardList): Observable<BoardList> {
    return this.http.post<BoardList>(`${this.apiUrl}/${this.baseUrl}`, boardData);
  }

  update(id: number, boardData: BoardList): Observable<BoardList> {
    return this.http.put<BoardList>(`${this.apiUrl}/${this.baseUrl}/${id}`, boardData);
  }

  delete(id: number): Observable<BoardList> {
    return this.http.delete<BoardList>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }
}