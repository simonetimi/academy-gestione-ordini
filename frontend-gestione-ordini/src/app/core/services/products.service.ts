import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #products$ = new BehaviorSubject<Product[]>([]);
  #httpService = inject(HttpService);
  #notificationService: NotificationService = inject(NotificationService);

  constructor() {
    this.#httpService.getAllproducts().subscribe({
      next: (value) => this.#products$.next(value),
    });
  }

  get products() {
    return this.#products$.asObservable();
  }

  addProduct(product: Product) {
    this.#httpService.addProduct(product).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        const products = this.#products$.getValue();
        products.push(value);
        this.#products$.next(products);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(`Prodotto aggiunto!`);
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }

  removeProduct(product: Product) {
    this.#httpService.removeProduct(product.id).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        let products = this.#products$.getValue();
        products = products.filter(
          (currentProduct) => product.id !== currentProduct.id,
        );
        this.#products$.next(products);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(
          `Prodotto eliminato!`,
        );
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }

  updateProduct(product: Product) {
    this.#httpService.updateProduct(product).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        const products = this.#products$.getValue();
        const prodIndex = products.findIndex(
          (currentProduct) => currentProduct.id === product.id,
        );
        products[prodIndex] = value;
        this.#products$.next(products);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(
          `Prodotto aggiornato!`,
        );
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }
}
