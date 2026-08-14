import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CotisationService, Cotisation } from '../../../services/cotisation';
import { LogementService, Logement } from '../../../services/logement';

@Component({
  selector: 'app-cotisation-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './cotisation-form-dialog.html',
  styleUrl: './cotisation-form-dialog.css',
})
export class CotisationFormDialog implements OnInit {
  item: Cotisation = { type: 'mensuelle', montant: 0, date_echeance: '', logement_id: 0 };
  isEdit = false;
  logements: Logement[] = [];
  errorMessage = '';
  saving = false;

  constructor(
    private service: CotisationService,
    private logementService: LogementService,
    private dialogRef: MatDialogRef<CotisationFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Cotisation | null
  ) {
    if (data) { this.item = { ...data }; this.isEdit = true; }
  }

  ngOnInit(): void {
    this.logementService.getAll().subscribe({ next: (data) => (this.logements = data) });
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
