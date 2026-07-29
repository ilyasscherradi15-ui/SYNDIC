import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private residenceService: ResidenceService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
    const dialogRef = this.dialog.open(ResidenceFormDialog, { width: '400px', data: null });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.loadResidences(); });
  }

  openEditDialog(residence: Residence): void {
    const dialogRef = this.dialog.open(ResidenceFormDialog, { width: '400px', data: residence });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.loadResidences(); });
  }

  deleteResidence(id: number): void {
  this.residenceService.delete(id).subscribe({
    next: () => {
      this.loadResidences();
      this.snackBar.open('Résidence supprimée.', 'Fermer', { duration: 3000 });
    },
    error: (err) => {
      const message = err.error?.message || 'Une erreur est survenue.';
      this.snackBar.open(message, 'Fermer', { duration: 4000 });
    },
  });
}
  goToImmeubles(residenceId: number): void {
    this.router.navigate(['/immeubles'], { queryParams: { residence_id: residenceId } });
  }
}
