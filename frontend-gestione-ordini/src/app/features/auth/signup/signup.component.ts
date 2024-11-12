import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  #authService: AuthService = inject(AuthService);

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  signup() {
    this.#authService.signup(
      this.signupForm.controls.username.value!,
      this.signupForm.controls.email.value!,
      this.signupForm.controls.password.value!,
    );
  }
}
