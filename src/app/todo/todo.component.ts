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
  private isRequestActive = new BehaviorSubject<boolean>(false);
  createTodoForm = new FormControl('', Validators.required);

  editTodoForm = new FormControl('', Validators.required);

  public get isRequestActive$() {
    return this.isRequestActive.asObservable();
  }

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
      .getUserTodos(this.userId)
      .subscribe((todoList) => this.updateTodoArr(todoList.todos));
  }

  private setIsRequestActive(value: boolean) {
    this.isRequestActive.next(value);
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
    this.setIsRequestActive(true);
    const todo = this.createTodoForm.value as string;
    this.httpService.addUserTodo(todo, this.userId).subscribe((todo) => {
      todo.isImmutable = true;
      const extendedTodoArr = this.todoArr.value.slice();
      extendedTodoArr.push(todo);
      this.updateTodoArr(extendedTodoArr);
      this.createTodoForm.reset();
      this.setIsRequestActive(false);
    });
  }

  public removeTodo(todo: Todo) {
    this.setIsRequestActive(true);
    this.httpService.removeUserTodo(todo.id).subscribe(() => {
      const filteredTodoArr = this.todoArr.value.filter(
        (el) => el.todo !== todo.todo
      );
      this.updateTodoArr(filteredTodoArr);
      this.setIsRequestActive(false);
    });
  }

  public editTodo(i: number) {
    if (this.selectedTodo.value === this.todoArr.value[i]) {
      this.setIsRequestActive(true);
      this.httpService.editUserTodo(this.todoArr.value[i].id).subscribe(() => {
        this.selectTodo(null);
        this.setIsRequestActive(false);
      });
    } else {
      this.selectTodo(this.todoArr.value[i]);
    }
  }
}
