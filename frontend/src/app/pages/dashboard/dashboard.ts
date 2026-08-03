import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ResidenceService } from '../../services/residence';
import { LogementService } from '../../services/logement';
import { CotisationService } from '../../services/cotisation';
import { DepenseService } from '../../services/depense';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  nbResidences = 0;
  nbLogements = 0;
  totalCotisationsAttendues = 0;
  totalCotisationsEncaissees = 0;
  totalImpayes = 0;
  totalDepenses = 0;

  constructor(
    private residenceService: ResidenceService,
    private logementService: LogementService,
    private cotisationService: CotisationService,
    private depenseService: DepenseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    forkJoin({
      residences: this.residenceService.getAll(),
      logements: this.logementService.getAll(),
      cotisations: this.cotisationService.getAll(),
      depenses: this.depenseService.getAll(),
    }).subscribe(({ residences, logements, cotisations, depenses }) => {
      this.nbResidences = residences.length;
      this.nbLogements = logements.length;

      this.totalCotisationsAttendues = cotisations.reduce((sum, c) => sum + Number(c.montant), 0);

      this.totalCotisationsEncaissees = cotisations
        .filter((c) => c.statut === 'payee')
        .reduce((sum, c) => sum + Number(c.montant), 0);

      this.totalImpayes = cotisations
        .filter((c) => c.statut === 'non_payee' || c.statut === 'retard' || c.statut === 'partielle')
        .reduce((sum, c) => sum + Number(c.montant), 0);

      this.totalDepenses = depenses.reduce((sum, d) => sum + Number(d.montant), 0);
    });
  }

  downloadRapport(): void {
    this.http.get(`${environment.apiUrl}/rapports/financier`, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport-financier-${new Date().toISOString().slice(0, 10)}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Erreur téléchargement rapport', err),
    });
  }
}
