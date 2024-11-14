import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.scss',
})
export class ConfirmDeleteComponent {
  #dialogRef = inject(MatDialogRef);

  onConfirmDelete() {
    this.#dialogRef.close(true);
  }

  onCancel() {
    this.#dialogRef.close(false);
  }
}
