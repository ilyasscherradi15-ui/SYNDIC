import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProprietaireService, Proprietaire } from '../../services/proprietaire';
import { ProprietaireFormDialog } from './proprietaire-form-dialog/proprietaire-form-dialog';

@Component({
  selector: 'app-proprietaires',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './proprietaires.html',
  styleUrl: './proprietaires.css',
})
export class Proprietaires implements OnInit {
  items: Proprietaire[] = [];
  displayedColumns = ['nom_complet', 'cin', 'telephone', 'email', 'actions'];

  constructor(private service: ProprietaireService, private dialog: MatDialog) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
  }

  openCreate(): void {
    const ref = this.dialog.open(ProprietaireFormDialog, { width: '400px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Proprietaire): void {
    const ref = this.dialog.open(ProprietaireFormDialog, { width: '400px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    if (!confirm('Supprimer ce propriétaire ?')) return;
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
