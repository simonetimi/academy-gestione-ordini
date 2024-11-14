import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';
import { Order, OrderDTO, OrderStateDto } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  #orders$ = new BehaviorSubject<Order[]>([]);
  #httpService = inject(HttpService);
  #notificationService: NotificationService = inject(NotificationService);

  constructor() {
    this.#httpService.getAllOrders().subscribe({
      next: (value) => {
        this.#orders$.next(value);
      },
    });
  }

  get orders() {
    return this.#orders$.asObservable();
  }

  get ordersBehaviorSubject() {
    return this.#orders$;
  }

  addOrder(order: Order) {
    // dto per matchare il dto che richiede il backend (manda i prodotti e il cliente solo come ID)
    const orderDto: OrderDTO = {
      id: order.id,
      date: order.date,
      state: order.state,
      totalPriceNoVat: order.totalPriceNoVat,
      totalPriceWithVat: order.totalPriceWithVat,
      clientId: order.client.id,
      orderProductList: order.orderProducts.map((orderProduct) => {
        return {
          productId: orderProduct.product.id,
          quantity: orderProduct.quantity,
        };
      }),
    };

    this.#httpService.addOrder(orderDto).subscribe({
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
    const orderState: OrderStateDto = {
      state: order.state,
    };
    this.#httpService.updateOrder(orderState, order.id).subscribe({
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
