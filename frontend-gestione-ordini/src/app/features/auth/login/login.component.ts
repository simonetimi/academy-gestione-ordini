import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  #authService: AuthService = inject(AuthService);
  loginForm = new FormGroup({
    username: new FormControl(this.#authService.userLogin.value?.username, [Validators.required]),
    password: new FormControl(this.#authService.userLogin.value?.username, [Validators.required]),
  });
}
