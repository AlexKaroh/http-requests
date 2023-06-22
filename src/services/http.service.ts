import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/interfaces/user-data';
import { UserTodos } from 'src/interfaces/user-todos';
import { Todo } from 'src/interfaces/todo';

const URL = 'https://dummyjson.com';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public userLogin(username: string, password: string) {
    return this.http.post<UserData>(`${URL}/auth/login`, {
      username: username,
      password: password,
    });
  }

  public getUserTodos(userId: string) {
    return this.http.get<UserTodos>(`${URL}/todos/user/${userId}`, {
      withCredentials: true,
    });
  }

  public addUserTodo(todo: string, userId: string) {
    return this.http.post<Todo>(
      `${URL}/todos/add`,
      {
        todo: todo,
        completed: false,
        userId: userId,
      },
      { withCredentials: true }
    );
  }

  public removeUserTodo(todoId : string) {
    return this.http.delete<Todo>(`${URL}/todos/${todoId}`, {
      withCredentials: true,
    });
  }

  public editUserTodo(todoId: string) {
    return this.http.put<Todo>(
      `${URL}/todos/${todoId}`,
      {
        completed: false,
      },
      { withCredentials: true }
    );
  }
}
