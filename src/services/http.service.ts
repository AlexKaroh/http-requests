import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/interfaces/user-response';
import { tap, catchError, delay } from 'rxjs/operators';
import { Observable, of, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  isAuthInvalid = false;

  constructor(private http: HttpClient, private router: Router) {}

  public userAuth(username: string, password: string) {
    return this.http
      .post<UserResponse>(
        'https://dummyjson.com/auth/login',
        JSON.stringify({ username: username, password: password }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(
        take(1),
        tap((data: UserResponse) => {
          sessionStorage.setItem('id', (data.id).toString())
          this.router.navigate(['/todo']);
        }),
        catchError(this.handleError<UserResponse>())
      );
  }

  public getUserToDo(userId: string) {
    return this.http.get(`https://dummyjson.com/todos/user/${userId}`).pipe(
      tap((data) => console.log(data)),
      catchError(this.handleError<string>())
    );
  }

  private handleError<T>(result?: T) {
    return (): Observable<T> => {
      this.isAuthInvalid = true;
      return of(result as T);
    };
  }
}
