import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private todoArr = new BehaviorSubject<Todo[]>([]);
  todoForm = new FormControl('', Validators.required);
  userId = sessionStorage.getItem('id') as string;
  isEdit = false;

  public editTodo() {
    this.isEdit = !this.isEdit
  }

  public get todoArr$() {
    return this.todoArr.asObservable();
  }

  public signOut() {
    return this.httpService.signOut();
  }

  private updateTodoArr(todoArr: Todo[]) {
    this.todoArr.next(todoArr);
  }

  constructor(private httpService: HttpService) {
    this.httpService
      .getUserToDo(this.userId)
      .subscribe((todoList) => this.updateTodoArr(todoList.todos));
  }

  public addTodo() {
    if (this.todoForm.invalid) {
      this.todoForm.markAsTouched();
      return;
    }
    const todo = this.todoForm.value as string;
    this.httpService.addUserToDo(todo, this.userId).subscribe((todo) => {
      const expandedTodoArr = this.todoArr.value.slice();
      expandedTodoArr.push(todo);
      this.updateTodoArr(expandedTodoArr);
    });
  }

  public removeTodo(todo: Todo) {
    this.httpService.removeUserToDo(todo.id).subscribe(() => {
      const filteredTodoArr = this.todoArr.value.filter(
        (el) => el.todo !== todo.todo
      );
      this.updateTodoArr(filteredTodoArr);
    });
  }
}
