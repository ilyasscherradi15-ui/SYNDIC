import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Document {
  id?: number;
  nom: string;
  chemin: string;
  documentable_type: 'depense' | 'logement' | 'residence';
  documentable_id: number;
}

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/documents`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Document[]> { return this.http.get<Document[]>(this.apiUrl); }
  create(item: Document): Observable<Document> { return this.http.post<Document>(this.apiUrl, item); }
  update(id: number, item: Partial<Document>): Observable<Document> { return this.http.put<Document>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
