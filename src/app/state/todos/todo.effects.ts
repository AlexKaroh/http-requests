import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import { userIdSelector } from '../user-auth/user-auth.selector';
import * as TodoActions from './todo.actions';

export const loadTodos$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(TodoActions.loadTodos),
      withLatestFrom(store.select(userIdSelector)),
      exhaustMap(([, userId]) =>
        httpService.getUserTodos(userId).pipe(
          map((userTodos) => TodoActions.loadSuccess({ userTodos })),
          catchError((error) => of(TodoActions.loadFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);


export const addTodo$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(TodoActions.addTodo),
      withLatestFrom(store.select(userIdSelector)),
      exhaustMap(([action, userId]) =>
        httpService.addUserTodo(action.todo, userId as string).pipe(
          map((todo) => {
            return TodoActions.addTodoSuccess({
              newTodo: { ...todo, isImmutable: true },
            });
          }),
          catchError((error) => of(TodoActions.addTodoFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const removeTodo$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(TodoActions.removeTodo),
      exhaustMap((action) =>
        httpService.removeUserTodo(action.todoId).pipe(
          map((deletedTodo) => TodoActions.removeTodoSuccess({ deletedTodo })),
          catchError((error) => of(TodoActions.removeTodoFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const editTodo$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(TodoActions.editTodo),
      exhaustMap((action) =>
        httpService.editUserTodo(action.todoId).pipe(
          map((editedTodo) =>
            TodoActions.editTodoSuccess({ editedTodo, newTodo: action.newTodo })
          ),
          catchError((error) => of(TodoActions.editTodoFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
