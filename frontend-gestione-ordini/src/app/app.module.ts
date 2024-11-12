import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';
import { MainComponent } from './features/main/main.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgOptimizedImage } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MainComponent],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage, SharedModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
