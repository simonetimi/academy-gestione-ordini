import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  #httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.#httpClient = httpClient;
  }

  login(username: string, password: string) {
    return this.#httpClient.post<User>('http://localhost:8080/auth/signin', {
      username,
      password,
    });
  }

  signup(username: string, email: string, password: string) {
    return this.#httpClient.post<string>('http://localhost:8080/auth/signup', {
      username,
      email,
      password,
    });
  }
}
