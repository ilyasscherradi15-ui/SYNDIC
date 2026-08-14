import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OccupantService, Occupant } from '../../../services/occupant';
import { LogementService, Logement } from '../../../services/logement';

@Component({
  selector: 'app-occupant-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './occupant-form-dialog.html',
  styleUrl: './occupant-form-dialog.css',
})
export class OccupantFormDialog implements OnInit {
  item: Occupant = { nom_complet: '', date_entree: '', logement_id: 0 };
  isEdit = false;
  logements: Logement[] = [];
  errorMessage = '';
  saving = false;

  constructor(
    private service: OccupantService,
    private logementService: LogementService,
    private dialogRef: MatDialogRef<OccupantFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Occupant | null
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
