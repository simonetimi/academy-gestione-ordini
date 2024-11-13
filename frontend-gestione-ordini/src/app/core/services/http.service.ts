import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  #httpClient: HttpClient = inject(HttpClient);
  #token = '';

  baseUrl = 'http://localhost:8080';

  constructor() {
    // prende il token dal local storage, se esiste
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser) {
      this.#token = JSON.parse(stringifiedUser).token;
    }
  }

  setToken(token: string) {
    this.#token = token;
  }

  // auth

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.#httpClient.post(
      `${this.baseUrl}/auth/signin`,
      {
        username,
        password,
      },
      {
        headers: headers,
        observe: 'response',
        responseType: 'json',
      },
    );
  }

  signup(username: string, email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.#httpClient.post(
      `${this.baseUrl}/auth/signup`,
      {
        username,
        email,
        password,
      },
      {
        headers: headers,
        observe: 'response',
        responseType: 'text',
      },
    );
  }

  // products

  getAllproducts() {
    return this.#httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }

  addProduct(product: Product) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.post<Product>(`${this.baseUrl}/products`, product, {
      headers: headersWithToken,
    });
  }

  removeProduct(productId: string) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.delete<string>(
      `${this.baseUrl}/products/${productId}`,
      {
        headers: headersWithToken,
      },
    );
  }

  updateProduct(product: Product) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.put<Product>(`${this.baseUrl}/products`, product, {
      headers: headersWithToken,
    });
  }

  // clients

  getAllClients() {
    return this.#httpClient.get<Client[]>(`${this.baseUrl}/clients`);
  }

  addClient(client: Client) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.post<Client>(`${this.baseUrl}/clients`, client, {
      headers: headersWithToken,
    });
  }

  removeClient(clientId: string) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.delete<string>(
      `${this.baseUrl}/client/${clientId}`,
      {
        headers: headersWithToken,
      },
    );
  }

  updateClient(client: Client) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.put<Client>(`${this.baseUrl}/clients`, client, {
      headers: headersWithToken,
    });
  }

  // orders

  getAllOrders() {
    return this.#httpClient.get<Order[]>(`${this.baseUrl}/orders`);
  }

  addOrder(order: Order) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.post<Order>(`${this.baseUrl}/orders`, order, {
      headers: headersWithToken,
    });
  }

  updateOrder(order: Order) {
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
    return this.#httpClient.put<Order>(`${this.baseUrl}/orders`, order, {
      headers: headersWithToken,
    });
  }
}
