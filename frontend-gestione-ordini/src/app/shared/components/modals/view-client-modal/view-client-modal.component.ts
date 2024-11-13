import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/Client';

@Component({
  selector: 'app-view-client-modal',
  templateUrl: './view-client-modal.component.html',
  styleUrl: './view-client-modal.component.scss',
})
export class ViewClientModalComponent {
  #dialogRef = inject(MatDialogRef);
  clientData: Client = inject(MAT_DIALOG_DATA);

  onClose() {
    this.#dialogRef.close();
  }
}
