/* eslint-disable @ngrx/prefer-action-creator-in-dispatch */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Todo } from 'src/interfaces/todo';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addTodo,
  clearSelectTodo,
  editTodo,
  loadTodos,
  removeTodo,
  selectTodo,
} from '../state/todos/todo.actions';
import {
  todosListSelector,
  todosListLoadingSelector,
  isFirstRequestSelector,
  selectedTodoSelector,
} from '../state/todos/todo.selector';
import { userIdSelector } from '../state/user-auth/user-auth.selector';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  createTodoForm = new FormControl('', Validators.required);
  editTodoForm = new FormControl('', Validators.required);

  userId$ = this.store.select(userIdSelector);
  todosList$ = this.store.select(todosListSelector);
  isRequestActive$ = this.store.select(todosListLoadingSelector);
  isFirstRequest$ = this.store.select(isFirstRequestSelector);
  selectedTodo$ = this.store.select(selectedTodoSelector);

  private userId?: string;

  constructor(private router: Router, private store: Store) {
    this.userId$
      .pipe(
        take(1),
        tap((userId) => (this.userId = userId))
      )
      .subscribe();
    this.store.dispatch(loadTodos({ userId: this.userId }));
  }

  public addTodo() {
    if (this.createTodoForm.invalid) {
      this.createTodoForm.markAsTouched();
      return;
    }
    const todo = this.createTodoForm.value as string;
    this.store.dispatch(addTodo({ todo, userId: this.userId }));
    this.createTodoForm.reset();
  }

  public removeTodo(todoId: string) {
    this.store.dispatch(removeTodo({ todoId }));
  }

  public saveTodo(savedTodo: Todo) {
    this.selectedTodo$
      .pipe(
        take(1),
        tap((todo) => {
          if (todo?.todo !== this.editTodoForm.value) {
            this.store.dispatch(
              editTodo({
                todoId: savedTodo.id,
                newTodo: this.editTodoForm.value as string,
              })
            );
            return;
          }
          this.store.dispatch(clearSelectTodo());
        })
      )
      .subscribe();
  }

  public selectTodo(selectedTodo: Todo) {
    this.store.dispatch(selectTodo({ selectedTodo }));
    this.editTodoForm.setValue(selectedTodo.todo);
  }

  public signOut() {
    this.router.navigate(['login']);
  }
}
