import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PaiementService, Paiement } from '../../services/paiement';
import { PaiementFormDialog } from './paiement-form-dialog/paiement-form-dialog';

@Component({
  selector: 'app-paiements',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './paiements.html',
  styleUrl: './paiements.css',
})
export class Paiements implements OnInit {
  items: Paiement[] = [];
  displayedColumns = ['montant', 'date_paiement', 'moyen_paiement', 'cotisation_id', 'actions'];

  constructor(private service: PaiementService, private dialog: MatDialog) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
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
    if (!confirm('Supprimer ce paiement ?')) return;
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
