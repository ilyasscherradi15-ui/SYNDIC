import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { OccupantService, Occupant } from '../../services/occupant';
import { OccupantFormDialog } from './occupant-form-dialog/occupant-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-occupants',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './occupants.html',
  styleUrl: './occupants.css',
})
export class Occupants implements OnInit {
  items: Occupant[] = [];
  displayedColumns = ['nom_complet', 'telephone', 'date_entree', 'date_sortie', 'logement_id', 'actions'];

  constructor(private service: OccupantService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
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
