import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProprietaireService, Proprietaire } from '../../services/proprietaire';
import { ProprietaireFormDialog } from './proprietaire-form-dialog/proprietaire-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-proprietaires',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './proprietaires.html',
  styleUrl: './proprietaires.css',
})
export class Proprietaires implements OnInit {
  allItems: Proprietaire[] = [];
  items: Proprietaire[] = [];
  displayedColumns = ['nom_complet', 'cin', 'telephone', 'email', 'actions'];
  searchTerm = '';

  constructor(private service: ProprietaireService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({
      next: (data) => { this.allItems = data; this.applyFilter(); },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.items = !term
      ? this.allItems
      : this.allItems.filter((p) => p.nom_complet.toLowerCase().includes(term) || p.cin.toLowerCase().includes(term));
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
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
