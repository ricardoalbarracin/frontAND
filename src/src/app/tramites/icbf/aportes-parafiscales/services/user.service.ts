import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  public usserLogged: User;

  constructor() {
  this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user: User) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUserIcbf', JSON.stringify(user));

  }

  getUserLoggedIn() {
  return JSON.parse(localStorage.getItem('currentUserIcbf'));
  }

  userLoggedOut() {
    this.isUserLoggedIn = false;
    this.usserLogged = null;
    localStorage.removeItem('currentUserIcbf');
  }

}
