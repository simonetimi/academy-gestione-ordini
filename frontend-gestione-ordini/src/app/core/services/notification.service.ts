import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

interface SnackbarConfig {
  duration: number;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
  panelClass?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  #snackBar = inject(MatSnackBar);

  snackbarConfig: SnackbarConfig = {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  snackbarSuccessConfig: SnackbarConfig = {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['success-snackbar'],
  };

  snackbarErrorConfig: SnackbarConfig = {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar'],
  };

  sendNotification(message: string) {
    this.#snackBar.open(message, '', this.snackbarConfig);
  }

  sendSuccessNotification(message: string) {
    this.#snackBar.open(message, '', this.snackbarSuccessConfig);
  }

  sendErrorNotification(message: string) {
    this.#snackBar.open(message, '', this.snackbarErrorConfig);
  }
}
