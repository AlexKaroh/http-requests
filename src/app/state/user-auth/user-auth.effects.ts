import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { HttpService } from 'src/services/http.service';
import * as UserActions from './user-auth.action';

export const loadUserData$ = createEffect(
  (actions$ = inject(Actions), httpService = inject(HttpService)) => {
    return actions$.pipe(
      ofType(UserActions.login),
      exhaustMap((action) =>
        httpService.userLogin(action.username, action.password).pipe(
          map((userData) =>  UserActions.loginSuccess({ userData })),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loginSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(UserActions.loginSuccess),
      tap((user) => {
        sessionStorage.setItem('id', user.userData.id as string)
        router.navigate(['todo']);
      })
    );
  },
  { functional: true, dispatch: false }
);

export const signOut$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(UserActions.signOut),
      tap(() => {
        sessionStorage.removeItem('id');
        router.navigate(['login']);
      })
    );
  },
  { functional: true, dispatch: false }
);
