import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/Product';
import { Client } from '../models/Client';
import { Order, OrderDTO, OrderStateDto } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  #httpClient: HttpClient = inject(HttpClient);
  #token = '';

  baseUrl = 'http://localhost:8080';
  headersWithToken = new HttpHeaders();

  constructor() {
    // prende il token dal local storage, se esiste
    const stringifiedUser = localStorage.getItem('user');
    if (stringifiedUser) {
      this.#token = JSON.parse(stringifiedUser).token;
    }
    this.headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
  }

  setToken(token: string) {
    this.#token = token;
    this.headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#token}`,
    });
  }

  // auth

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.#httpClient.post(
      `${this.baseUrl}/auth/login`,
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

  signup(username: string, email: string, password: string, role: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.#httpClient.post(
      `${this.baseUrl}/auth/signup`,
      {
        username,
        email,
        password,
        roles:[
          role
        ]
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
    return this.#httpClient.get<Product[]>(`${this.baseUrl}/products`,{
      headers: this.headersWithToken
    });
  }

  addProduct(product: Product) {
    return this.#httpClient.post<Product>(`${this.baseUrl}/products`, product, {
      headers: this.headersWithToken,
    });
  }

  removeProduct(productId: string) {
    return this.#httpClient.delete<string>(
      `${this.baseUrl}/products/${productId}`,
      {
        headers: this.headersWithToken,
      },
    );
  }

  updateProduct(product: Product) {
    return this.#httpClient.put<Product>(`${this.baseUrl}/products`, product, {
      headers: this.headersWithToken,
    });
  }

  // clients

  getAllClients() {
    return this.#httpClient.get<Client[]>(`${this.baseUrl}/clients`,{
      headers: this.headersWithToken,
    });
  }

  addClient(client: Client) {
    return this.#httpClient.post<Client>(`${this.baseUrl}/clients`, client, {
      headers: this.headersWithToken,
    });
  }

  removeClient(clientId: string) {
    return this.#httpClient.delete<string>(
      `${this.baseUrl}/client/${clientId}`,
      {
        headers: this.headersWithToken,
      },
    );
  }

  updateClient(client: Client) {
    return this.#httpClient.put<Client>(`${this.baseUrl}/clients`, client, {
      headers: this.headersWithToken,
    });
  }

  // orders

  getAllOrders() {
    return this.#httpClient.get<Order[]>(`${this.baseUrl}/orders`,{
      headers: this.headersWithToken,
    });
  }

  addOrder(order: OrderDTO) {
    return this.#httpClient.post<Order>(`${this.baseUrl}/orders`, order, {
      headers: this.headersWithToken,
    });
  }

  updateOrder(orderStateDto: OrderStateDto, orderId: string) {
    return this.#httpClient.put<Order>(
      `${this.baseUrl}/orders/${orderId}`,
      orderStateDto,
      {
        headers: this.headersWithToken,
      },
    );
  }
}
