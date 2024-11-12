import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent implements OnInit {
  #authService: AuthService = inject(AuthService);
  user$ = this.#authService.user;

  router: Router = inject(Router);
  url: string = '';

  // tracks curent url the render the correct button
  ngOnInit() {
    this.router.events
      .pipe(filter((value) => value instanceof NavigationEnd))
      .subscribe((value) => {
        this.url = value.url;
      });
  }

  onLogout() {
    this.#authService.logout();
  }
}
