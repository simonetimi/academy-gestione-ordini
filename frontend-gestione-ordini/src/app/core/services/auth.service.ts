import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';
import { HttpService } from './http.service';
import { PersistenceService } from './persistence.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import {UserLogin} from '../models/UserLogin';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #user$ = new BehaviorSubject<User | null>(null);
  userLogin = new BehaviorSubject<UserLogin | null>(null);
  #httpService: HttpService = inject(HttpService);
  #persistenceService: PersistenceService = inject(PersistenceService);
  #notificationService: NotificationService = inject(NotificationService);
  #router: Router = inject(Router);

  constructor() {
    // check if user exists
    const user: User | null = this.#persistenceService.retrieveUser();
    if (!user) return;

    // check if user's token is expired
    const expiredDate = new Date(user.tokenExpireDate);
    const currentDate = new Date();
    if (expiredDate < currentDate) return;

    // emit user (behavior subject)
    this.#user$.next(user);
  }

  get user(): Observable<User | null> {
    return this.#user$.asObservable();
  }

  login(username: string, password: string) {
    this.#httpService.login(username, password).subscribe({
      next: (value: User) => {
        this.#persistenceService.saveUser(value);
        this.#user$.next(value);
      },
      error: (err) => {
        this.#notificationService.sendNotification(`Errore login: ${err}`);
      },
    });
  }

  signup(username: string, email: string, password: string) {
    this.#httpService.signup(username, email, password).subscribe({
      next: (_value: HttpResponse<any>) => {
        if (_value.status === 200) {
          this.#notificationService.sendSuccessNotification(
            `Registrazione avvenuta con successo!`,
          );
            this.#router.navigate(['auth','login']);
        }
      },
      error: (err) => {
        console.log(err);
        this.#notificationService.sendErrorNotification(
          `Errore registrazione: ${err}`,
        );
      },
    });
  }
}
