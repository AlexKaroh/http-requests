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
  constructor(private http: HttpClient, private router: Router) {}

  isRequestError = false;
  userToken: string | null = null;
  userId: number | null = null;

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
          this.userToken = data.token;
          this.userId = data.id;
          this.router.navigate(['/todo']);
        }),
        catchError(this.handleError<UserResponse>())
      );
  }

  public getUserToDo(userId: number) {
    return this.http.get(`https://dummyjson.com/todos/user/${userId}`).pipe(
      tap((data) => console.log(data))
    );
  }

  private handleError<T>(result?: T) {
    return (): Observable<T> => {
      this.isRequestError = true;
      return of(result as T);
    };
  }
}
