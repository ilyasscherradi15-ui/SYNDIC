import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DepenseService, Depense } from '../../../services/depense';
import { ResidenceService, Residence } from '../../../services/residence';

@Component({
  selector: 'app-depense-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './depense-form-dialog.html',
  styleUrl: './depense-form-dialog.css',
})
export class DepenseFormDialog implements OnInit {
  item: Depense = { date_depense: '', categorie: 'autres', montant: 0, residence_id: 0 };
  isEdit = false;
  residences: Residence[] = [];
  categories = ['gardiennage', 'nettoyage', 'eau', 'electricite', 'jardinage', 'piscine', 'maintenance', 'reparations', 'assurance', 'autres'];

  constructor(
    private service: DepenseService,
    private residenceService: ResidenceService,
    private dialogRef: MatDialogRef<DepenseFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Depense | null
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
