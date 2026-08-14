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
import { DepenseService, Depense } from '../../services/depense';
import { DepenseFormDialog } from './depense-form-dialog/depense-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-depenses',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  ],
  templateUrl: './depenses.html',
  styleUrl: './depenses.css',
})
export class Depenses implements OnInit {
  allItems: Depense[] = [];
  items: Depense[] = [];
  displayedColumns = ['date_depense', 'categorie', 'fournisseur', 'montant', 'residence_id', 'actions'];
  searchTerm = '';
  loading = false;

  constructor(private service: DepenseService, private dialog: MatDialog, public authService: AuthService) {}

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
    this.items = !term
      ? this.allItems
      : this.allItems.filter((d) => d.categorie.toLowerCase().includes(term) || (d.fournisseur || '').toLowerCase().includes(term));
  }

  openCreate(): void {
    const ref = this.dialog.open(DepenseFormDialog, { width: '400px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Depense): void {
    const ref = this.dialog.open(DepenseFormDialog, { width: '400px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
