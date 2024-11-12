import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent implements OnInit {
  router: Router = inject(Router);
  url: string = '';

  ngOnInit() {
    this.router.events
      .pipe(filter((value) => value instanceof NavigationEnd))
      .subscribe((value) => {
        this.url = value.url;
        console.log(value.url);
      });
  }
}
