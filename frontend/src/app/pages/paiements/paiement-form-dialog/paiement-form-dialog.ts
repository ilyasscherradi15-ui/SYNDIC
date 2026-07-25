import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PaiementService, Paiement } from '../../../services/paiement';

@Component({
  selector: 'app-paiement-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './paiement-form-dialog.html',
  styleUrl: './paiement-form-dialog.css',
})
export class PaiementFormDialog {
  item: Paiement = { montant: 0, cotisation_id: 0 };
  isEdit = false;

  constructor(
    private service: PaiementService,
    private dialogRef: MatDialogRef<PaiementFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Paiement | null
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
