import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Immeuble {
  id?: number;
  nom: string;
  nb_etages?: number;
  description?: string;
  residence_id: number;
}

@Injectable({ providedIn: 'root' })
export class ImmeubleService {
  private apiUrl = `${environment.apiUrl}/immeubles`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Immeuble[]> { return this.http.get<Immeuble[]>(this.apiUrl); }
  create(item: Immeuble): Observable<Immeuble> { return this.http.post<Immeuble>(this.apiUrl, item); }
  update(id: number, item: Partial<Immeuble>): Observable<Immeuble> { return this.http.put<Immeuble>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
