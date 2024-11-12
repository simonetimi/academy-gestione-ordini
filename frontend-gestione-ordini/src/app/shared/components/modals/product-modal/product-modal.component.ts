import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../core/models/Product';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent implements OnInit {
  #dialogRef = inject(MatDialogRef);
  productsData: Product | null = inject(MAT_DIALOG_DATA);

  constructor() {}

  ngOnInit() {
    console.log(this.productsData);
    const product = this.productsData;
    if (product) {
      this.productForm.setValue({
        name: product.name,
        price: product.price,
        vat: product.vat,
      });
    }
  }

  // se product esiste, isEditMode è true. se product non esiste, questo valore è false
  isEditMode = !!this.productsData;

  productForm = new FormGroup({
    name: new FormControl(this.productsData?.name || ''),
    price: new FormControl(this.productsData?.price || ''),
    vat: new FormControl(this.productsData?.vat || ''),
  });

  // TODO ritorna alla componente che l'ha aperto this.dialogRef.close(product);
}
