import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { LogementService, Logement } from '../../services/logement';
import { LogementFormDialog } from './logement-form-dialog/logement-form-dialog';

@Component({
  selector: 'app-logements',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './logements.html',
  styleUrl: './logements.css',
})
export class Logements implements OnInit {
  items: Logement[] = [];
  displayedColumns = ['numero', 'type', 'quote_part', 'statut', 'residence_id', 'proprietaire_id', 'actions'];

  constructor(private service: LogementService, private dialog: MatDialog) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
  }

  openCreate(): void {
    const ref = this.dialog.open(LogementFormDialog, { width: '450px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Logement): void {
    const ref = this.dialog.open(LogementFormDialog, { width: '450px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    if (!confirm('Supprimer ce logement ?')) return;
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
