import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { LogementService, Logement } from '../../../services/logement';

@Component({
  selector: 'app-logement-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './logement-form-dialog.html',
  styleUrl: './logement-form-dialog.css',
})
export class LogementFormDialog {
  item: Logement = {
    numero: '', type: 'appartement', quote_part: 0, statut: 'vacant',
    residence_id: 0, immeuble_id: null, proprietaire_id: 0,
  };
  isEdit = false;

  constructor(
    private service: LogementService,
    private dialogRef: MatDialogRef<LogementFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Logement | null
  ) {
    if (data) { this.item = { ...data }; this.isEdit = true; }
  }

  save(): void {
    const obs = this.isEdit && this.item.id
      ? this.service.update(this.item.id, this.item)
      : this.service.create(this.item);
    obs.subscribe({ next: () => this.dialogRef.close(true), error: (err) => console.error(err) });
  }

  cancel(): void { this.dialogRef.close(false); }
}
