import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  saveUser(user: User) {
    const stringifiedUser = JSON.stringify(user);
    localStorage.setItem('user', stringifiedUser);
  }

  retrieveUser(): User | null {
    const stringifiedUser = localStorage.getItem('user');
    if (!stringifiedUser) return null;
    return JSON.parse(stringifiedUser);
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}
