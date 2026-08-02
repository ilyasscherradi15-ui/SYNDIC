import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ImmeubleService, Immeuble } from '../../services/immeuble';
import { ImmeubleFormDialog } from './immeuble-form-dialog/immeuble-form-dialog';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-immeubles',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './immeubles.html',
  styleUrl: './immeubles.css',
})
export class Immeubles implements OnInit {
  items: Immeuble[] = [];
  displayedColumns = ['nom', 'nb_etages', 'residence_id', 'actions'];

  constructor(private service: ImmeubleService, private dialog: MatDialog, public authService: AuthService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getAll().subscribe({ next: (data) => (this.items = data) });
  }

  openCreate(): void {
    const ref = this.dialog.open(ImmeubleFormDialog, { width: '400px', data: null });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  openEdit(item: Immeuble): void {
    const ref = this.dialog.open(ImmeubleFormDialog, { width: '400px', data: item });
    ref.afterClosed().subscribe((result) => { if (result) this.load(); });
  }

  deleteItem(id: number): void {
    this.service.delete(id).subscribe({ next: () => this.load() });
  }
}
