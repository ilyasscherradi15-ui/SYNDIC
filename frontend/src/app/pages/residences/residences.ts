import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ResidenceService, Residence } from '../../services/residence';
import { ResidenceFormDialog } from './residence-form-dialog/residence-form-dialog';

@Component({
  selector: 'app-residences',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './residences.html',
  styleUrl: './residences.css',
})
export class Residences implements OnInit {
  residences: Residence[] = [];
  displayedColumns: string[] = ['nom', 'adresse', 'ville', 'actif', 'actions'];

  constructor(private residenceService: ResidenceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadResidences();
  }

  loadResidences(): void {
    this.residenceService.getAll().subscribe({
      next: (data) => (this.residences = data),
      error: (err) => console.error('Erreur chargement résidences', err),
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ResidenceFormDialog, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadResidences();
    });
  }

  openEditDialog(residence: Residence): void {
    const dialogRef = this.dialog.open(ResidenceFormDialog, {
      width: '400px',
      data: residence,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadResidences();
    });
  }

  deleteResidence(id: number): void {
    if (!confirm('Supprimer cette résidence ?')) return;

    this.residenceService.delete(id).subscribe({
      next: () => this.loadResidences(),
      error: (err) => console.error('Erreur suppression', err),
    });
  }
}
