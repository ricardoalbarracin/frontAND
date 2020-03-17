import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn;
  public usserLogged: string;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user: string) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUserSic', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUserSic'));
  }

  userLoggedOut() {
    this.isUserLoggedIn = false;
    this.usserLogged = null;
    localStorage.removeItem('currentUserSic');
  }

}
