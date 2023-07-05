import { Injectable } from '@angular/core';
import { UserData } from 'src/interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userId = sessionStorage.getItem('id');
  userToken = sessionStorage.getItem('token');

  signIn(userData: UserData) {
    this.userId = userData.id  as string;
    this.userToken = userData.token  as string;
    sessionStorage.setItem('id', userData.id as string);
    sessionStorage.setItem('token', userData.token  as string);
  }

  signOut() {
    this.userId = '';
    this.userToken = '';
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
  }
}
