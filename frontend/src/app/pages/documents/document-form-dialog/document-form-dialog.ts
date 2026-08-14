import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DocumentService, Document } from '../../../services/document';
import { DepenseService, Depense } from '../../../services/depense';
import { LogementService, Logement } from '../../../services/logement';
import { ResidenceService, Residence } from '../../../services/residence';

@Component({
  selector: 'app-document-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './document-form-dialog.html',
  styleUrl: './document-form-dialog.css',
})
export class DocumentFormDialog implements OnInit {
  item: Document = { nom: '', chemin: '', documentable_type: 'depense', documentable_id: 0 };
  isEdit = false;
  depenses: Depense[] = [];
  logements: Logement[] = [];
  residences: Residence[] = [];
  errorMessage = '';
  saving = false;

  constructor(
    private service: DocumentService,
    private depenseService: DepenseService,
    private logementService: LogementService,
    private residenceService: ResidenceService,
    private dialogRef: MatDialogRef<DocumentFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Document | null
  ) {
    if (data) { this.item = { ...data }; this.isEdit = true; }
  }

  ngOnInit(): void {
    this.depenseService.getAll().subscribe({ next: (data) => (this.depenses = data) });
    this.logementService.getAll().subscribe({ next: (data) => (this.logements = data) });
    this.residenceService.getAll().subscribe({ next: (data) => (this.residences = data) });
  }

  onTypeChange(): void {
    this.item.documentable_id = 0;
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
