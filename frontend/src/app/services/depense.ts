import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Depense {
  id?: number;
  date_depense: string;
  categorie: string;
  description?: string;
  fournisseur?: string;
  montant: number;
  residence_id: number;
}

@Injectable({ providedIn: 'root' })
export class DepenseService {
  private apiUrl = `${environment.apiUrl}/depenses`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Depense[]> { return this.http.get<Depense[]>(this.apiUrl); }
  create(item: Depense): Observable<Depense> { return this.http.post<Depense>(this.apiUrl, item); }
  update(id: number, item: Partial<Depense>): Observable<Depense> { return this.http.put<Depense>(`${this.apiUrl}/${id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
