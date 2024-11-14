import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  #authService: AuthService = inject(AuthService);
  #formBuilder = inject(FormBuilder);
  passedUsername: string | null = this.#authService.userLogin.value?.username!;
  passedPassword: string | null = this.#authService.userLogin.value?.password!;
  loginForm = this.#formBuilder.group({
    username: [this.passedUsername, [Validators.required]],
    password: [this.passedPassword, [Validators.required, Validators.minLength(4)]],
  });

  login() {
    if (this.passedUsername && this.passedPassword) {
      this.#authService.login(this.passedUsername!, this.passedPassword!);
    } else if (this.username !== null && this.password !== null) {
      this.#authService.login(
        this.loginForm.controls.username.value!,
        this.loginForm.controls.password.value!,
      );
    }
  }

  get username() {
    return this.loginForm.controls['username'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
