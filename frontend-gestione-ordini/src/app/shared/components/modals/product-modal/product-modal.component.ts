import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../core/models/Product';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  #dialogRef = inject(MatDialogRef);
  productData: Product | null = inject(MAT_DIALOG_DATA);
  varArray: number[] = [0, 4, 5, 10, 22];

  constructor() {}

  // se product esiste, isEditMode è true. se product non esiste, questo valore è false
  isEditMode = !!this.productData;

  priceValidator(val: AbstractControl): ValidationErrors | null {
    if (val.value <= 0) {
      return { notAllowed: true };
    }
    return null;
  }

  productForm = new FormGroup({
    name: new FormControl<string>(this.productData?.name || '', [
      Validators.required,
      Validators.min(2),
    ]),
    price: new FormControl<number>(this.productData?.price || 0, [
      Validators.required,
      this.priceValidator,
    ]),
    vat: new FormControl<number>(this.productData?.vat || 22),
  });

  onProductSubmit() {
    const product: Product = {
      id: this.productData?.id || '',
      name: this.productForm.controls.name.value as string,
      price: this.productForm.controls.price.value as number,
      vat: this.productForm.controls.vat.value as number,
    };
    this.#dialogRef.close(product);
  }
}
