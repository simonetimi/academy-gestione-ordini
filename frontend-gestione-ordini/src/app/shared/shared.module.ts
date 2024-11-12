import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { RouterLink } from '@angular/router';
import { ProductModalComponent } from './components/modals/product-modal/product-modal.component';
import { ClientModalComponent } from './components/modals/client-modal/client-modal.component';

@NgModule({
  declarations: [
    AuthButtonComponent,
    ProductModalComponent,
    ClientModalComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    AuthButtonComponent,
    RouterLink,
  ],
})
export class SharedModule {}
