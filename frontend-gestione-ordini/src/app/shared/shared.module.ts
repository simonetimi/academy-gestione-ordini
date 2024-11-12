import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@NgModule({
  declarations: [AuthButtonComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule, AuthButtonComponent],
})
export class SharedModule {}
