import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DepenseService, Depense } from '../../services/depense';
import { DepenseFormDialog } from './depense-form-dialog/depense-form-dialog';

@Component({
  selector: 'app-depenses',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './depenses.html',
  styleUrl: './depenses.css',
})
export class Depenses implements OnInit {
  items: Depense[] = [];
  displayedColumns = ['date_depense', 'categorie', 'fournisseur', 'montant', 'residence_id', 'actions'];

  constructor(private service: DepenseService, private dialog: MatDialog) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
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
    if (!confirm('Supprimer cette dépense ?')) return;
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
