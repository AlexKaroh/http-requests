/* eslint-disable @ngrx/prefix-selectors-with-select */

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todo.domain';

export const userTodosSelector = createFeatureSelector<TodosState>('userTodos');

export const selectErrorMessage = createSelector(
  userTodosSelector,
  (state) => state.errorMessage
);

export const todosListLoadingSelector = createSelector(
  userTodosSelector,
  (state) => state.request?.status === 'loading'
);

export const isFirstRequestSelector = createSelector(
  userTodosSelector,
  (state) => state.request?.isFirstRequest
);

export const todosListSelector = createSelector(
  userTodosSelector,
  (state) => state.todos
);

export const selectedTodoSelector = createSelector(
  userTodosSelector,
  (state) => state.selectedTodo
);
