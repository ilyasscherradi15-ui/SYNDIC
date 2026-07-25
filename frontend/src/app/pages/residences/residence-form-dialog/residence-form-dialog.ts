import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResidenceService, Residence } from '../../../services/residence';

@Component({
  selector: 'app-residence-form-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule,
  ],
  templateUrl: './residence-form-dialog.html',
  styleUrl: './residence-form-dialog.css',
})
export class ResidenceFormDialog {
  residence: Residence = { nom: '', adresse: '', ville: '', actif: true };
  isEdit = false;

  constructor(
    private residenceService: ResidenceService,
    private dialogRef: MatDialogRef<ResidenceFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Residence | null
  ) {
    if (data) {
      this.residence = { ...data };
      this.isEdit = true;
    }
  }

  save(): void {
    if (this.isEdit && this.residence.id) {
      this.residenceService.update(this.residence.id, this.residence).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erreur mise à jour', err),
      });
    } else {
      this.residenceService.create(this.residence).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erreur création', err),
      });
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
