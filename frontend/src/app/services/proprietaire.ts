import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Proprietaire {
  id?: number;
  nom_complet: string;
  cin: string;
  telephone?: string;
  email?: string;
  adresse?: string;
}

@Injectable({ providedIn: 'root' })
export class ProprietaireService {
  private apiUrl = `${environment.apiUrl}/proprietaires`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Proprietaire[]> { return this.http.get<Proprietaire[]>(this.apiUrl); }
  create(item: Proprietaire): Observable<Proprietaire> { return this.http.post<Proprietaire>(this.apiUrl, item); }
  update(id: number, item: Partial<Proprietaire>): Observable<Proprietaire> { return this.http.put<Proprietaire>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
