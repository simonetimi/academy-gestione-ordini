import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/Client';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../../core/models/Order';
import { ELEMENT_DATA_PLACEHOLDER as clientsImport } from '../../../../features/dashboard/operator/clients/clients.component';
import { ELEMENT_DATA_PLACEHOLDER as productsImport } from '../../../../features/dashboard/admin/admin.component';
import { Product } from '../../../../core/models/Product';
import { OrderProduct } from '../../../../core/models/OrderProduct';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent {
  #dialogRef = inject(MatDialogRef);
  orderData: Order | null = inject(MAT_DIALOG_DATA);

  //TODO this is a placeholder for clients AND PRODUCTS. get it from the clients + products state!
  clients: Client[] = clientsImport;
  products: Product[] = productsImport;

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
    client: new FormControl<Client | undefined>(this.orderData?.client, [
      Validators.required,
    ]),
    productsList: new FormArray([
      new FormGroup({
        product: new FormControl<Product | null>(null, Validators.required),
        quantity: new FormControl<number>(1, [Validators.required]),
      }),
    ]),
  });

  addNewProduct() {
    // product + quantity
    const productFormGroup = new FormGroup({
      product: new FormControl<Product | null>(null, Validators.required),
      quantity: new FormControl<number>(1, [Validators.required]),
    });
    this.productsList.push(productFormGroup);
  }

  get productsList() {
    return this.orderForm.get('productsList') as FormArray;
  }

  onOrderSubmit() {
    // trova il client
    //const client = this.clients.find((client) => {
    //  return client.id === this.orderForm.controls.client.value;
    //});
    const products: OrderProduct[] = this.productsList.value;

    const totalPrice = products.reduce(
      (acc, orderProduct) =>
        orderProduct.quantity * orderProduct.product.price + acc,
      0,
    );
    const order: Order = {
      id: this.orderData?.id as string,
      date: this.orderForm.controls.date.value as Date,
      state: this.orderForm.controls.state.value as 'IN_PROGRESS' | 'COMPLETED',
      totalPrice,
      productsList: products,
      client: this.orderForm.controls.client.value as Client,
    };

    this.#dialogRef.close(order);
  }
}
