import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { Router, RouterModule } from '@angular/router';
import { Todo } from 'src/interfaces/todo';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  todosArr: Todo[] = [];
  todoForm = new FormControl('', Validators.required);
  userId = sessionStorage.getItem('id') as string;

  constructor(private httpService: HttpService, private router: Router) {
    this.httpService
      .getUserToDo(this.userId)
      .subscribe((todoList) => (this.todosArr = todoList.todos));
  }

  public addTodo() {
    if (this.todoForm.invalid) {
      this.todoForm.markAsTouched();
      return;
    }
    const todo = this.todoForm.value as string;
    this.httpService
      .addUserToDo(todo, this.userId)
      .subscribe((todo) => this.todosArr.push(todo));
  }

  removeTodo(todo: Todo) {
    this.httpService
      .removeUserToDo(todo.id)
      .subscribe(
        () =>
          (this.todosArr = this.todosArr.filter((el) => el.todo !== todo.todo))
      );
  }

  signOut() {
    sessionStorage.removeItem('id');
    this.router.navigate(['login']);
  }
}
