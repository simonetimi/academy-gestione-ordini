import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Client } from '../../../../core/models/Client';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.scss',
})
export class ClientModalComponent {
  #dialogRef = inject(MatDialogRef);
  clientData: Client | null = inject(MAT_DIALOG_DATA);

  capValidator(val: AbstractControl): ValidationErrors | null {
    if (val.value.length !== 5) {
      return { notAllowed: true };
    } else if (Number.isNaN(val.value)) {
      return { notAllowed: true };
    }
    return null;
  }

  // se product esiste, isEditMode è true. se product non esiste, questo valore è false
  isEditMode = !!this.clientData;

  clientForm = new FormGroup({
    companyName: new FormControl<string>(
      this.clientData?.companyName || '',
      Validators.required,
    ),
    streetName: new FormControl<string>(
      this.clientData?.streetName || '',
      Validators.required,
    ),
    cap: new FormControl<string>(this.clientData?.cap || '', [
      Validators.required,
      this.capValidator,
    ]),
    city: new FormControl<string>(
      this.clientData?.city || '',
      Validators.required,
    ),
    province: new FormControl<string>(
      this.clientData?.province || '',
      Validators.required,
    ),
    nation: new FormControl<string>(
      this.clientData?.nation || '',
      Validators.required,
    ),
  });

  onClientSubmit() {
    const client: Client = {
      id: this.clientData?.id as string,
      companyName: this.clientForm.controls.companyName.value as string,
      streetName: this.clientForm.controls.streetName.value as string,
      cap: this.clientForm.controls.streetName.value as string,
      city: this.clientForm.controls.city.value as string,
      province: this.clientForm.controls.province.value as string,
      nation: this.clientForm.controls.nation.value as string,
    };
    this.#dialogRef.close(client);
  }
}
