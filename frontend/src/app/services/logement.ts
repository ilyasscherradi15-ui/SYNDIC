import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Logement {
  id?: number;
  numero: string;
  type: 'appartement' | 'villa' | 'duplex' | 'bungalow';
  surface?: number;
  quote_part: number;
  statut: 'occupe' | 'vacant';
  residence_id: number;
  immeuble_id?: number | null;
  proprietaire_id: number;
}

@Injectable({ providedIn: 'root' })
export class LogementService {
  private apiUrl = `${environment.apiUrl}/logements`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Logement[]> { return this.http.get<Logement[]>(this.apiUrl); }
  create(item: Logement): Observable<Logement> { return this.http.post<Logement>(this.apiUrl, item); }
  update(id: number, item: Partial<Logement>): Observable<Logement> { return this.http.put<Logement>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
