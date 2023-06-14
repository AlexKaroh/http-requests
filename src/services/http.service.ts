import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserResponse } from 'src/interfaces/user-response';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TodoResponse } from 'src/interfaces/todo-response';
import { DeletedTodo } from 'src/interfaces/deleted-todo-response';
import { Todo } from 'src/interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private isLoading = new BehaviorSubject<boolean>(false);
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  public get isLoading$ (){
    return this.isLoading.asObservable();
  }

  public userAuth(username: string, password: string) {
    console.log(1)
    this.isLoading.next(true);
    return this.http
      .post<UserResponse>(
        'https://dummyjson.com/auth/login',
        JSON.stringify({ username: username, password: password }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(
        tap((data: UserResponse) => {
          sessionStorage.setItem('id', data.id.toString());
          this.router.navigate(['/todo']);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  public getUserToDo(userId: string) {
    return this.http
      .get<TodoResponse>(`https://dummyjson.com/todos/user/${userId}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  public addUserToDo(todo: string , userId: string) {
    return this.http
      .post<Todo>(
        'https://dummyjson.com/todos/add',
        JSON.stringify({
          todo: todo,
          completed: false,
          userId: userId,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  public removeUserToDo(todoId: string) {
    return this.http
      .delete<DeletedTodo>(`https://dummyjson.com/todos/${todoId}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    this.isLoading.next(false);
    this.errorMessage = error.error.message;
    return throwError(() => new Error(this.errorMessage));
  }

  public signOut() {
    sessionStorage.removeItem('id');
    this.router.navigate(['login']);
    this.isLoading.next(false);
  }
}
