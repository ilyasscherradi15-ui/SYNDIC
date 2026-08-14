import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LogementService, Logement } from '../../../services/logement';
import { ResidenceService, Residence } from '../../../services/residence';
import { ProprietaireService, Proprietaire } from '../../../services/proprietaire';
import { ImmeubleService, Immeuble } from '../../../services/immeuble';

@Component({
  selector: 'app-logement-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './logement-form-dialog.html',
  styleUrl: './logement-form-dialog.css',
})
export class LogementFormDialog implements OnInit {
  item: Logement = {
    numero: '', type: 'appartement', quote_part: 0, statut: 'vacant',
    residence_id: 0, immeuble_id: null, proprietaire_id: 0,
  };
  isEdit = false;
  residences: Residence[] = [];
  proprietaires: Proprietaire[] = [];
  immeubles: Immeuble[] = [];
  errorMessage = '';
  saving = false;

  constructor(
    private service: LogementService,
    private residenceService: ResidenceService,
    private proprietaireService: ProprietaireService,
    private immeubleService: ImmeubleService,
    private dialogRef: MatDialogRef<LogementFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Logement | null
  ) {
    if (data) { this.item = { ...data }; this.isEdit = true; }
  }

  ngOnInit(): void {
    this.residenceService.getAll().subscribe({ next: (data) => (this.residences = data) });
    this.proprietaireService.getAll().subscribe({ next: (data) => (this.proprietaires = data) });
    this.immeubleService.getAll().subscribe({ next: (data) => (this.immeubles = data) });
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
