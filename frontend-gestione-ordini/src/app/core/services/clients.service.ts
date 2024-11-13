import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  #clients$ = new BehaviorSubject<Client[]>([]);
  #httpService = inject(HttpService);
  #notificationService: NotificationService = inject(NotificationService);

  constructor() {
    this.#httpService.getAllClients().subscribe({
      next: (value) => this.#clients$.next(value),
    });
  }

  get clients() {
    return this.#clients$.asObservable();
  }

  addClient(client: Client) {
    this.#httpService.addClient(client).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        const clients = this.#clients$.getValue();
        clients.push(value);
        this.#clients$.next(clients);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(`Cliente aggiunto!`);
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }

  removeClient(client: Client) {
    const clientId = client.id;
    this.#httpService.removeClient(clientId).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        let clients = this.#clients$.getValue();
        clients = clients.filter(
          (currentClient) => client.id !== currentClient.id,
        );
        this.#clients$.next(clients);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(`Cliente eliminato!`);
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }

  updateClient(client: Client) {
    this.#httpService.updateClient(client).subscribe({
      next: (value) => {
        // aggiorna behavior subject
        const clients = this.#clients$.getValue();
        const clientIndex = clients.findIndex(
          (currentClient) => currentClient.id === client.id,
        );
        clients[clientIndex] = value;
        this.#clients$.next(clients);
        // invia notifica UI
        this.#notificationService.sendSuccessNotification(
          `Cliente aggiornato!`,
        );
      },
      error: (err) =>
        this.#notificationService.sendErrorNotification(
          'Errore:' + err.message,
        ),
    });
  }
}
