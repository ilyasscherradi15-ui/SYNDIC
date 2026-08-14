import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaiementService, Paiement } from '../../services/paiement';
import { PaiementFormDialog } from './paiement-form-dialog/paiement-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-paiements',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  ],
  templateUrl: './paiements.html',
  styleUrl: './paiements.css',
})
export class Paiements implements OnInit {
  allItems: Paiement[] = [];
  items: Paiement[] = [];
  displayedColumns = ['montant', 'date_paiement', 'moyen_paiement', 'cotisation_id', 'actions'];
  searchTerm = '';
  loading = false;

  constructor(private service: PaiementService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => { this.allItems = data; this.applyFilter(); this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.items = !term ? this.allItems : this.allItems.filter((p) => (p.moyen_paiement || '').toLowerCase().includes(term));
  }

  openCreate(): void {
    const ref = this.dialog.open(PaiementFormDialog, { width: '400px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Paiement): void {
    const ref = this.dialog.open(PaiementFormDialog, { width: '400px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
