import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { MainComponent } from './features/main/main.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgOptimizedImage } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage, SharedModule],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
