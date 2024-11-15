import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/Client';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Order } from '../../../../core/models/Order';
import { Product } from '../../../../core/models/Product';
import { OrderProduct } from '../../../../core/models/OrderProduct';
import { ClientsService } from '../../../../core/services/clients.service';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss',
})
export class OrderModalComponent implements OnInit {
  #dialogRef = inject(MatDialogRef);
  orderData: Order | null = inject(MAT_DIALOG_DATA);
  #clientsService: ClientsService = inject(ClientsService);
  #productsService: ProductsService = inject(ProductsService);
  clients: Client[] = [];
  products: Product[] = [];

  quantityValidator(val: AbstractControl): ValidationErrors | null {
    if (val.value <= 0) {
      return { notAllowed: true };
    }
    return null;
  }

  // se product esiste, isEditMode è true. se product non esiste, questo valore è false
  isEditMode = !!this.orderData;

  ngOnInit() {
    this.#clientsService.clients.subscribe({
      next: (value) => {
        this.clients = value;
      },
    });
    this.#productsService.products.subscribe({
      next: (value) => {
        this.products = value;
      },
    });

    // crea i formarray con i dati dei prodotti, perché poi quando chiama il service usa i dati nei form array
    if (this.isEditMode) {
      this.orderData?.orderProducts.forEach((orderProduct) => {
        const productFormGroup = new FormGroup({
          product: new FormControl<Product>(
            orderProduct.product,
            Validators.required,
          ),
          quantity: new FormControl<number>(orderProduct.quantity, [
            Validators.required,
            this.quantityValidator,
          ]),
        });
        this.productsList.push(productFormGroup);
      });
    }
  }

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
    productsList: new FormArray([]),
  });

  addNewProduct() {
    // product + quantity
    const productFormGroup = new FormGroup({
      product: new FormControl<Product | null>(null, Validators.required),
      quantity: new FormControl<number>(1, [
        Validators.required,
        this.quantityValidator,
      ]),
    });
    this.productsList.push(productFormGroup);
  }

  get productsList() {
    return this.orderForm.get('productsList') as FormArray;
  }

  onOrderSubmit() {
    const products: OrderProduct[] = this.productsList.value;

    const totalPriceNoVat = products.reduce(
      (acc, orderProduct) =>
        orderProduct.quantity * orderProduct.product.price + acc,
      0,
    );

    const totalPriceWithVat = products.reduce((acc, orderProduct) => {
      const percentageVat = orderProduct.product.vat / 100;
      const orderProductPriceWithVat =
        percentageVat * orderProduct.product.price + orderProduct.product.price;
      return orderProduct.quantity * orderProductPriceWithVat + acc;
    }, 0);

    const order: Order = {
      id: this.orderData?.id as string,
      date: this.orderForm.controls.date.value as Date,
      state: this.orderForm.controls.state.value as 'IN_PROGRESS' | 'COMPLETED',
      totalPriceNoVat,
      totalPriceWithVat,
      orderProducts: products,
      client: this.orderForm.controls.client.value as Client,
    };

    this.#dialogRef.close(order);
  }
}
