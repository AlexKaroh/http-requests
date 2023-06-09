import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnDestroy {
  private todoArr = new BehaviorSubject<Todo[]>([]);
  private isRequestActive = new BehaviorSubject<boolean>(false);
  private isTodosRequested = new BehaviorSubject<boolean>(true);
  private destroyStream = new Subject<void>();

  selectedTodo: Todo | null = null;

  createTodoForm = new FormControl('', Validators.required);
  editTodoForm = new FormControl('', Validators.required);

  public get isTodosRequested$() {
    return this.isTodosRequested.asObservable();
  }

  public get isRequestActive$() {
    return this.isRequestActive.asObservable();
  }

  public get todoArr$() {
    return this.todoArr.asObservable();
  }

  private get userId() {
    return this.userService.userId!;
  }

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private router: Router
  ) {
    this.httpService
      .getUserTodos(this.userId)
      .pipe(takeUntil(this.destroyStream))
      .subscribe({
        next: (todoList) => {
          this.updateTodoArr(todoList.todos);
          this.setIsTodosRequested(false);
        },
        error: () => this.setIsTodosRequested(false),
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

  public addTodo() {
    if (this.createTodoForm.invalid) {
      this.createTodoForm.markAsTouched();
      return;
    }
    this.setIsRequestActive(true);
    const todo = this.createTodoForm.value as string;
    this.httpService
      .addUserTodo(todo, this.userId)
      .pipe(takeUntil(this.destroyStream))
      .subscribe({
        next: (addedTodo) => {
          addedTodo.isImmutable = true;
          const extendedTodoArr = this.todoArr.value.slice();
          extendedTodoArr.push(addedTodo);
          this.updateTodoArr(extendedTodoArr);
          this.createTodoForm.reset();
          this.setIsRequestActive(false);
        },
        error: () => this.setIsRequestActive(false),
      });
  }

  public removeTodo(removedTodo: Todo) {
    this.setIsRequestActive(true);
    this.httpService
      .removeUserTodo(removedTodo.id)
      .pipe(takeUntil(this.destroyStream))
      .subscribe({
        next: () => {
          const filteredTodoArr = this.todoArr.value.filter(
            (el) => el.todo !== removedTodo.todo
          );
          this.updateTodoArr(filteredTodoArr);
          this.setIsRequestActive(false);
        },
        error: () => this.setIsRequestActive(false),
      });
  }

  public saveTodo(savedTodo: Todo) {
    if (
      this.selectedTodo!.todo !== this.editTodoForm.value &&
      this.selectedTodo === savedTodo
    ) {
      this.setIsRequestActive(true);
      this.httpService
        .editUserTodo(savedTodo.id)
        .pipe(takeUntil(this.destroyStream))
        .subscribe({
          next: () => {
            savedTodo.todo = this.editTodoForm.value as string;
            this.selectedTodo = null;
            this.setIsRequestActive(false);
          },
          error: () => this.setIsRequestActive(false),
        });
      return;
    }
    this.selectedTodo = null;
  }

  public editTodo(editedTodo: Todo) {
    this.selectedTodo = this.selectedTodo !== editedTodo ? editedTodo : null;
    this.editTodoForm.setValue(editedTodo.todo);
  }

  public signOut() {
    this.userService.signOut();
    this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.destroyStream.next();
    this.destroyStream.complete();
  }
}
