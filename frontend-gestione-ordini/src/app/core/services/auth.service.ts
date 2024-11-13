import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { HttpService } from './http.service';
import { PersistenceService } from './persistence.service';
import { NotificationService } from './notification.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserLogin } from '../models/UserLogin';
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

  isAuthenticated = false;
  isTokenExpired = true;
  userRole = '';

  constructor() {
    // check if user exists
    const user: User | null = this.#persistenceService.retrieveUser();
    if (!user) return;

    // check if user's token is expired
    const expiredDate = new Date(user.tokenExpireDate);
    const currentDate = new Date();
    if (currentDate < expiredDate) {
      this.isTokenExpired = false;
      this.isAuthenticated = true;
      this.userRole = user.role;
      if(user.role == "ROLE_ADMIN") {
        this.#router.navigate(['dashboard/', 'admin']);
      } else {
        this.#router.navigate(['dashboard/', 'operator']);
      }
    }

    // emit user (behavior subject)
    this.#user$.next(user);
  }

  get user(): BehaviorSubject<User | null> {
    return this.#user$;
  }

  login(username: string, password: string) {
    this.#httpService.login(username, password).subscribe({
      next: (value: HttpResponse<any>) => {
        const user: User = value.body;
        this.#notificationService.sendSuccessNotification(
          `Login avvenuto con successo!`,
        );
        // salva utente nella persistenza e next nel behavior observable
        this.#persistenceService.saveUser(user);
        this.#user$.next(user);
        this.isAuthenticated = true;
        this.isTokenExpired = false;
        // invia il token all'http service

        this.#httpService.setToken(user.token);
        if (user.role) {
          this.userRole = user.role;
        }
        if(user.role == "ROLE_ADMIN") {
          this.#router.navigate(['dashboard/', 'admin']);
        } else {
          this.#router.navigate(['dashboard/', 'operator']);

      }
      },
      error: (err) => {
        this.#notificationService.sendNotification(
          `Errore login: ${err.message}`,
        );
      },
    });
  }

  signup(username: string, email: string, password: string) {
    this.#httpService.signup(username, email, password).subscribe({
      next: (_value: HttpResponse<any>) => {
          this.#notificationService.sendSuccessNotification(
            `Registrazione avvenuta con successo!`,
          );
          this.#router.navigate(['auth', 'login']);

      },
      error: (err) => {
        console.log(err);
        this.#notificationService.sendErrorNotification(
          `Errore registrazione: ${err.message}`,
        );
      },
    });
  }

  logout() {
    // elimina l'utente dal behavior subject, local storage ed esegue redirect a login
    this.#persistenceService.removeUser();
    this.#user$.next(null);
    this.#notificationService.sendSuccessNotification(
      `Logout avvenuto con successo!`,
    );
    this.#router.navigate(['auth', 'login']);
  }
}
