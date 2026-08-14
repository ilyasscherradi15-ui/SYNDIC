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
import { LogementService, Logement } from '../../services/logement';
import { LogementFormDialog } from './logement-form-dialog/logement-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-logements',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
  ],
  templateUrl: './logements.html',
  styleUrl: './logements.css',
})
export class Logements implements OnInit {
  allItems: Logement[] = [];
  items: Logement[] = [];
  displayedColumns = ['numero', 'type', 'quote_part', 'statut', 'residence_id', 'proprietaire_id', 'actions'];
  searchTerm = '';
  loading = false;

  constructor(private service: LogementService, private dialog: MatDialog, public authService: AuthService) {}

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
    this.items = !term ? this.allItems : this.allItems.filter((l) => l.numero.toLowerCase().includes(term) || l.type.toLowerCase().includes(term));
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
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
