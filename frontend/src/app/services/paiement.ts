import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Paiement {
  id?: number;
  montant: number;
  date_paiement?: string;
  moyen_paiement?: string;
  cotisation_id: number;
}

@Injectable({ providedIn: 'root' })
export class PaiementService {
  private apiUrl = `${environment.apiUrl}/paiements`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Paiement[]> { return this.http.get<Paiement[]>(this.apiUrl); }
  create(item: Paiement): Observable<Paiement> { return this.http.post<Paiement>(this.apiUrl, item); }
  update(id: number, item: Partial<Paiement>): Observable<Paiement> { return this.http.put<Paiement>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
