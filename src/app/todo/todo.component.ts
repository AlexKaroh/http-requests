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
  private selectedTodo = new BehaviorSubject<Todo | null>(null);
  private isRequestActive = new BehaviorSubject<boolean>(false);
  private isTodosRequested = new BehaviorSubject<boolean>(false);

  createTodoForm = new FormControl('', Validators.required);
  editTodoForm = new FormControl('', Validators.required);

  public get isTodosRequested$() {
    return this.isTodosRequested.asObservable();
  }

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

  constructor(private httpService: HttpService, private router: Router) {
    this.setIsTodosRequested(true);
    this.httpService.getUserTodos(this.userId).subscribe((todoList) => {
      this.updateTodoArr(todoList.todos);
      this.setIsTodosRequested(false);
    });
  }

  private setIsTodosRequested(value: boolean) {
    this.isTodosRequested.next(value);
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

  public editTodo(todo: Todo) {
    if (this.selectedTodo.value !== todo) {
      this.selectTodo(todo);
    } else if (
      this.selectedTodo.value?.todo !== this.editTodoForm.value &&
      this.selectedTodo.value === todo
    ) {
      this.setIsRequestActive(true);
      this.httpService.editUserTodo(todo.id).subscribe(() => {
        todo.todo = this.editTodoForm.value as string;
        this.selectTodo(null);
        this.setIsRequestActive(false);
      });
      return;
    } else {
      this.selectTodo(null);
    }
    this.editTodoForm.setValue(todo.todo);
  }

  public signOut() {
    this.router.navigate(['login']);
    sessionStorage.removeItem('id');
  }
}
