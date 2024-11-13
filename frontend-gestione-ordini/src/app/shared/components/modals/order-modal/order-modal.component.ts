import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/Client';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../../core/models/Order';
import { ELEMENT_DATA_PLACEHOLDER } from '../../../../features/dashboard/operator/clients/clients.component';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent {
  #dialogRef = inject(MatDialogRef);
  orderData: Order | null = inject(MAT_DIALOG_DATA);

  //TODO this is a placeholder for clients. get it from the clients state!
  clients: Client[] = ELEMENT_DATA_PLACEHOLDER;

  constructor() {}

  // se product esiste, isEditMode è true. se product non esiste, questo valore è false
  isEditMode = !!this.orderData;

  // TODO client and state should be a select

  orderForm = new FormGroup({
    date: new FormControl<Date>(this.orderData?.date || new Date(), [
      Validators.required,
    ]),
    state: new FormControl<string>(this.orderData?.state || 'IN_PROGRESS', [
      Validators.required,
    ]),
    client: new FormControl<string>(this.orderData?.client.id || '', [
      Validators.required,
    ]),
    productsList: new FormArray([]),
  });

  onOrderSubmit() {
    const client = this.clients.find((client) => {
      return client.id === this.orderForm.controls.client.value;
    });
    /*
    const order: Order = {
      id: this.orderData?.id as string,
      date: this.orderForm.controls.date.value as Date,
      state: this.orderForm.controls.state.value as 'IN_PROGRESS' | 'COMPLETED',
      // TODO this should be calculated totalPrice: this.orderForm.controls.totalPrice.value as number,
      // TODO productslist: find product from product service
      client: client as Client,
    };

    this.#dialogRef.close(order);
     */
  }

  addNewProduct() {
    // product + quantity
    const productControl = new FormControl<string>('', Validators.required);
    const quantityControl = new FormControl<number>(1, [Validators.required]);
    this.productsList.push({ productControl, quantityControl });
  }

  get productsList() {
    return this.orderForm.get('productsList') as FormArray;
  }
}
