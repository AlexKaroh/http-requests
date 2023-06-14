import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { RouterModule } from '@angular/router';
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
  private selectedTodo = new BehaviorSubject<Todo | null>(null);
  createTodoForm = new FormControl('', Validators.required);

  public get selectedTodo$() {
    return this.selectedTodo.asObservable();
  }

  public get todoArr$() {
    return this.todoArr.asObservable();
  }

  private get userId() {
    return sessionStorage.getItem('id') as string;
  }

  constructor(private httpService: HttpService) {
    this.httpService
      .getUserToDo(this.userId)
      .subscribe((todoList) => this.updateTodoArr(todoList.todos));
  }

  public signOut() {
    return this.httpService.signOut();
  }

  private updateTodoArr(todoArr: Todo[]) {
    this.todoArr.next(todoArr);
  }

  private selectTodo(todo: Todo | null) {
    this.selectedTodo.next(todo);
  }

  public addTodo() {
    if (this.createTodoForm.invalid) {
      this.createTodoForm.markAsTouched();
      return;
    }
    const todo = this.createTodoForm.value as string;
    this.httpService.addUserToDo(todo, this.userId).subscribe((todo) => {
      todo.isEditable = false;
      const expandedTodoArr = this.todoArr.value.slice();
      expandedTodoArr.push(todo);
      this.updateTodoArr(expandedTodoArr);
      this.createTodoForm.reset();
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

  public editTodo(i: number) {
    this.httpService.editUserToDo(this.todoArr.value[i].id).subscribe(() => {
      if (this.selectedTodo.value === this.todoArr.value[i]) {
        this.selectTodo(null);
      } else {
        this.selectTodo(this.todoArr.value[i]);
      }
    });
  }
}
