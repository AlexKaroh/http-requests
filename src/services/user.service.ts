import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId = sessionStorage.getItem('id');
  userToken = sessionStorage.getItem('token');

  constructor(private router: Router) {}

  signIn(userData: UserData) {
    this.userId = userData.id;
    this.userToken = userData.token;
    sessionStorage.setItem('id', userData.id);
    sessionStorage.setItem('token', userData.token);
    this.router.navigate(['todo']);
  }

  signOut() {
    this.userId = '';
    this.userToken = '';
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
