import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/interfaces/user-data';
import { tap } from 'rxjs/operators';
import { UserTodos } from 'src/interfaces/user-todos';
import { Todo } from 'src/interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public userLogin(username: string, password: string) {
    return this.http
      .post<UserData>(
        'https://dummyjson.com/auth/login',
        JSON.stringify({ username: username, password: password })
      )
      .pipe(
        tap((data: UserData) => {
          sessionStorage.setItem('id', data.id);
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
    return this.http.delete(`https://dummyjson.com/todos/${todoId}`);
  }

  public editUserTodo(todoId: string) {
    return this.http.put(
      `https://dummyjson.com/todos/${todoId}`,
      JSON.stringify({
        completed: false,
      })
    );
  }
}
