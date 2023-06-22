import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, take } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import * as TodoActions from './todo.actions';

export const loadTodos$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(TodoActions.loadTodos),
      exhaustMap((action) =>
        httpService.getUserTodos(action.userId as string).pipe(
          take(1),
          map((userTodos) => TodoActions.loadSuccess({ userTodos })),
          catchError((error) => of(TodoActions.loadFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const addTodo$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(TodoActions.addTodo),
      exhaustMap((action) =>
        httpService.addUserTodo(action.todo, action.userId as string).pipe(
          take(1),
          map((todo) => TodoActions.addTodoSuccess({ todo })),
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
          take(1),
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
          take(1),
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

