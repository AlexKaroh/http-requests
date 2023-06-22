import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { TodosState } from './todos/todo.domain';
import { todoReducer } from './todos/todo.reducer';
import { AuthState } from './user-auth/user-auth.domain';
import { userReducer } from './user-auth/user-auth.reducer';

export interface State {
  userAuth: AuthState;
  userTodos: TodosState;
}

export const reducers: ActionReducerMap<State> = {
  userAuth: userReducer,
  userTodos: todoReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
