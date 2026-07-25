import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Cotisation {
  id?: number;
  type: 'mensuelle' | 'trimestrielle' | 'annuelle' | 'exceptionnelle';
  montant: number;
  date_echeance: string;
  statut?: 'payee' | 'partielle' | 'retard' | 'non_payee';
  logement_id: number;
}

@Injectable({ providedIn: 'root' })
export class CotisationService {
  private apiUrl = `${environment.apiUrl}/cotisations`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Cotisation[]> { return this.http.get<Cotisation[]>(this.apiUrl); }
  create(item: Cotisation): Observable<Cotisation> { return this.http.post<Cotisation>(this.apiUrl, item); }
  update(id: number, item: Partial<Cotisation>): Observable<Cotisation> { return this.http.put<Cotisation>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
