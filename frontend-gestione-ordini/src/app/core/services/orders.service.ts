import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  #orders$ = new BehaviorSubject<Order[]>([]);
  #httpService = inject(HttpService);
  #notificationService: NotificationService = inject(NotificationService);

  constructor() {
    this.#httpService.getAllOrders().subscribe({
      next: (value) => this.#orders$.next(value),
    });
  }

  get orders() {
    return this.#orders$.asObservable();
  }

  addOrder(order: Order) {
    this.#httpService.addOrder(order).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        const orders = this.#orders$.getValue();
        orders.push(value);
        this.#orders$.next(orders);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(`Ordine aggiunto!`);
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }

  updateOrder(order: Order) {
    this.#httpService.updateOrder(order).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        const orders = this.#orders$.getValue();
        const orderIndex = orders.findIndex(
          (currentOrder) => currentOrder.id === order.id,
        );
        orders[orderIndex] = value;
        this.#orders$.next(orders);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(`Ordine aggiornato!`);
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }
}
