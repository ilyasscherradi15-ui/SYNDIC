import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OccupantService, Occupant } from '../../services/occupant';
import { OccupantFormDialog } from './occupant-form-dialog/occupant-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-occupants',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './occupants.html',
  styleUrl: './occupants.css',
})
export class Occupants implements OnInit {
  allItems: Occupant[] = [];
  items: Occupant[] = [];
  displayedColumns = ['nom_complet', 'telephone', 'date_entree', 'date_sortie', 'logement_id', 'actions'];
  searchTerm = '';

  constructor(private service: OccupantService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({
      next: (data) => { this.allItems = data; this.applyFilter(); },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.items = !term ? this.allItems : this.allItems.filter((o) => o.nom_complet.toLowerCase().includes(term));
  }

  openCreate(): void {
    const ref = this.dialog.open(OccupantFormDialog, { width: '400px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Occupant): void {
    const ref = this.dialog.open(OccupantFormDialog, { width: '400px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
