import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Client } from '../../../../core/models/Client';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
})
export class ClientModalComponent {
  #dialogRef = inject(MatDialogRef);
  clientData: Client | null = inject(MAT_DIALOG_DATA);

  constructor() {}

  // se product esiste, isEditMode è true. se product non esiste, questo valore è false
  isEditMode = !!this.clientData;

  clientForm = new FormGroup({
    companyName: new FormControl<string>(this.clientData?.companyName || ''),
    streetName: new FormControl<string>(this.clientData?.streetName || ''),
    city: new FormControl<string>(this.clientData?.city || ''),
    province: new FormControl<string>(this.clientData?.province || ''),
    nation: new FormControl<string>(this.clientData?.nation || ''),
  });

  onClientSubmit() {
    const client: Client = {
      id: this.clientData?.id as string,
      companyName: this.clientForm.controls.companyName.value as string,
      streetName: this.clientForm.controls.streetName.value as string,
      city: this.clientForm.controls.city.value as string,
      province: this.clientForm.controls.province.value as string,
      nation: this.clientForm.controls.nation.value as string,
    };
    this.#dialogRef.close(client);
  }
}
