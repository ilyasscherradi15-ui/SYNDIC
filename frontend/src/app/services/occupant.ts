import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Occupant {
  id?: number;
  nom_complet: string;
  telephone?: string;
  email?: string;
  date_entree: string;
  date_sortie?: string | null;
  logement_id: number;
}

@Injectable({ providedIn: 'root' })
export class OccupantService {
  private apiUrl = `${environment.apiUrl}/occupants`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Occupant[]> { return this.http.get<Occupant[]>(this.apiUrl); }
  create(item: Occupant): Observable<Occupant> { return this.http.post<Occupant>(this.apiUrl, item); }
  update(id: number, item: Partial<Occupant>): Observable<Occupant> { return this.http.put<Occupant>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
