import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Residence {
  id?: number;
  nom: string;
  adresse: string;
  ville: string;
  actif?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ResidenceService {
  private apiUrl = `${environment.apiUrl}/residences`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Residence[]> {
    return this.http.get<Residence[]>(this.apiUrl);
  }

  getOne(id: number): Observable<Residence> {
    return this.http.get<Residence>(`${this.apiUrl}/${id}`);
  }

  create(residence: Residence): Observable<Residence> {
    return this.http.post<Residence>(this.apiUrl, residence);
  }

  update(id: number, residence: Partial<Residence>): Observable<Residence> {
    return this.http.put<Residence>(`${this.apiUrl}/${id}`, residence);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
