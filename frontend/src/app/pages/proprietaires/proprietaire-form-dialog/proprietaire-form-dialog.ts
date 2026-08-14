import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProprietaireService, Proprietaire } from '../../../services/proprietaire';

@Component({
  selector: 'app-proprietaire-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './proprietaire-form-dialog.html',
  styleUrl: './proprietaire-form-dialog.css',
})
export class ProprietaireFormDialog {
  item: Proprietaire = { nom_complet: '', cin: '' };
  isEdit = false;
  errorMessage = '';
  saving = false;

  constructor(
    private service: ProprietaireService,
    private dialogRef: MatDialogRef<ProprietaireFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Proprietaire | null
  ) {
    if (data) { this.item = { ...data }; this.isEdit = true; }
  }

  save(): void {
    this.errorMessage = '';
    this.saving = true;
    const obs = this.isEdit && this.item.id
      ? this.service.update(this.item.id, this.item)
      : this.service.create(this.item);
    obs.subscribe({
      next: () => { this.saving = false; this.dialogRef.close(true); },
      error: (err) => { this.saving = false; this.errorMessage = this.extractErrorMessage(err); },
    });
  }

  private extractErrorMessage(err: any): string {
    if (err.error?.errors) {
      const firstError = Object.values(err.error.errors)[0];
      return Array.isArray(firstError) ? firstError[0] : String(firstError);
    }
    return err.error?.message || 'Une erreur est survenue. Veuillez réessayer.';
  }

  cancel(): void { this.dialogRef.close(false); }
}
