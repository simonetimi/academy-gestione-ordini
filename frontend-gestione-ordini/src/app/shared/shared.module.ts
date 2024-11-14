import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { RouterLink } from '@angular/router';
import { ProductModalComponent } from './components/modals/product-modal/product-modal.component';
import { ClientModalComponent } from './components/modals/client-modal/client-modal.component';
import { ViewClientModalComponent } from './components/modals/view-client-modal/view-client-modal.component';
import { OrderModalComponent } from './components/modals/order-modal/order-modal.component';
import { ViewOrderProductsComponent } from './components/modals/view-order-products/view-order-products.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { VatPipe } from './pipes/vat.pipe';

@NgModule({
  declarations: [
    AuthButtonComponent,
    ProductModalComponent,
    ClientModalComponent,
    OrderModalComponent,
    ViewClientModalComponent,
    ViewOrderProductsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    VatPipe,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    AuthButtonComponent,
    RouterLink,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedModule {}
