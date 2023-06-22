
import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user-auth.action';
import { AuthState } from './user-auth.domain';

export const initialState: AuthState = {
  user: {
    id: sessionStorage.getItem('id') as string
  }
};

export const userReducer = createReducer<AuthState>(
  initialState,

  on(UserActions.login, (state) : AuthState => ({
    ...state,
    status: 'loading',
  })),

  on(UserActions.loginSuccess, (state, { userData }) : AuthState => ({
    ...state,
    user: userData,
    status: 'success',
  })),

  on(UserActions.loginFailure, (state, { error }) : AuthState => ({
    ...state,
    errorMessage: error,
    status: 'error',
  })),

  on(UserActions.signOut, (state) : AuthState => ({
    ...state,
    user: {}
  })),

);
