import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = environment.apiUrl;
  private baseUrl = 'tags';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/${this.baseUrl}`);
  }

  getById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  create(tagData: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiUrl}/${this.baseUrl}`, tagData);
  }

  update(id: number, tagData: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${this.baseUrl}/${id}`, tagData);
  }

  delete(id: number): Observable<Tag> {
    return this.http.delete<Tag>(`${this.apiUrl}/${this.baseUrl}/${id}`);
  }

  getTagsByTask(taskId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/${this.baseUrl}/getTagByTask/${taskId}`);
  }
}
