import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OccupantService, Occupant } from '../../../services/occupant';

@Component({
  selector: 'app-occupant-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './occupant-form-dialog.html',
  styleUrl: './occupant-form-dialog.css',
})
export class OccupantFormDialog {
  item: Occupant = { nom_complet: '', date_entree: '', logement_id: 0 };
  isEdit = false;

  constructor(
    private service: OccupantService,
    private dialogRef: MatDialogRef<OccupantFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Occupant | null
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
