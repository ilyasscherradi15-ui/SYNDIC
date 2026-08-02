import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ImmeubleService, Immeuble } from '../../../services/immeuble';
import { ResidenceService, Residence } from '../../../services/residence';

@Component({
  selector: 'app-immeuble-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './immeuble-form-dialog.html',
  styleUrl: './immeuble-form-dialog.css',
})
export class ImmeubleFormDialog implements OnInit {
  item: Immeuble = { nom: '', residence_id: 0 };
  isEdit = false;
  residences: Residence[] = [];

  constructor(
    private service: ImmeubleService,
    private residenceService: ResidenceService,
    private dialogRef: MatDialogRef<ImmeubleFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Immeuble | null
  ) {
    if (data) { this.item = { ...data }; this.isEdit = true; }
  }

  ngOnInit(): void {
    this.residenceService.getAll().subscribe({ next: (data) => (this.residences = data) });
  }

  save(): void {
    const obs = this.isEdit && this.item.id
      ? this.service.update(this.item.id, this.item)
      : this.service.create(this.item);
    obs.subscribe({ next: () => this.dialogRef.close(true), error: (err) => console.error(err) });
  }

  cancel(): void { this.dialogRef.close(false); }
}
