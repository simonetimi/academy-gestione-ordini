import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderProduct } from '../../../../core/models/OrderProduct';

@Component({
  selector: 'app-view-order-products',
  templateUrl: './view-order-products.component.html',
  styleUrl: './view-order-products.component.scss',
})
export class ViewOrderProductsComponent {
  #dialogRef = inject(MatDialogRef);
  productsData: OrderProduct[] = inject(MAT_DIALOG_DATA);

  onClose() {
    this.#dialogRef.close();
  }
}
