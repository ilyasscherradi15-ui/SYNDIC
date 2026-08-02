import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CotisationService, Cotisation } from '../../services/cotisation';
import { CotisationFormDialog } from './cotisation-form-dialog/cotisation-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-cotisations',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './cotisations.html',
  styleUrl: './cotisations.css',
})
export class Cotisations implements OnInit {
  items: Cotisation[] = [];
  displayedColumns = ['type', 'montant', 'date_echeance', 'statut', 'logement_id', 'actions'];

  constructor(private service: CotisationService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
  }

  openCreate(): void {
    const ref = this.dialog.open(CotisationFormDialog, { width: '400px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Cotisation): void {
    const ref = this.dialog.open(CotisationFormDialog, { width: '400px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
