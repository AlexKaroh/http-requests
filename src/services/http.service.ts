import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/interfaces/user-data';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserTodos } from 'src/interfaces/user-todos';
import { Todo } from 'src/interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private isRequestActive = new BehaviorSubject<boolean>(false);
  errorMessage = '';

  public get isRequestActive$() {
    return this.isRequestActive.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) {}

  public setRequestStatus(status: boolean) {
    this.isRequestActive.next(status);
  }

  public userAuth(username: string, password: string) {
    this.setRequestStatus(true);
    return this.http
      .post<UserData>(
        'https://dummyjson.com/auth/login',
        JSON.stringify({ username: username, password: password })
      )
      .pipe(
        tap((data: UserData) => {
          sessionStorage.setItem('id', data.id);
          this.router.navigate(['/todo']);
        })
      );
  }

  public getUserTodos(userId: string) {
    return this.http.get<UserTodos>(
      `https://dummyjson.com/todos/user/${userId}`
    );
  }

  public addUserTodo(todo: string, userId: string) {
    return this.http.post<Todo>(
      'https://dummyjson.com/todos/add',
      JSON.stringify({
        todo: todo,
        completed: false,
        userId: userId,
      })
    );
  }

  public removeUserTodo(todoId: string) {
    return this.http.delete(
      `https://dummyjson.com/todos/${todoId}`
    );
  }

  public editUserTodo(todoId: string) {
    return this.http.put(
      `https://dummyjson.com/todos/${todoId}`,
      JSON.stringify({
        completed: false,
      })
    );
  }

  public signOut() {
    sessionStorage.removeItem('id');
    this.router.navigate(['login']);
    this.errorMessage = '';
    this.setRequestStatus(false);
  }
}
