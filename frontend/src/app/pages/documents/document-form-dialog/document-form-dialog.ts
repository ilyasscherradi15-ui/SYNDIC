import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DocumentService, Document } from '../../../services/document';

@Component({
  selector: 'app-document-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './document-form-dialog.html',
  styleUrl: './document-form-dialog.css',
})
export class DocumentFormDialog {
  item: Document = { nom: '', chemin: '', documentable_type: 'depense', documentable_id: 0 };
  isEdit = false;

  constructor(
    private service: DocumentService,
    private dialogRef: MatDialogRef<DocumentFormDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Document | null
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
