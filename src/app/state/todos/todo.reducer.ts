/* eslint-disable @ngrx/on-function-explicit-return-type */

import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { TodosState } from './todo.domain';

export const initialState: TodosState = {};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    request: {
      status: 'loading',
      isFirstRequest: true,
    },
  })),

  on(TodoActions.loadSuccess, (state, { userTodos }) => ({
    ...state,
    todos: userTodos.todos,
    request: {
      status: 'success',
    },
  })),

  on(TodoActions.loadFailure, (state, { error }) => ({
    ...state,
    request: {
      status: 'error',
    },
    errorMessage: error,
  })),

  on(TodoActions.addTodo, (state) => ({
    ...state,
    request: {
      status: 'loading',
    },
  })),

  on(TodoActions.addTodoSuccess, (state, { newTodo }) => ({
    ...state,
    request: {
      status: 'success',
    },
    todos: state.todos?.concat({ ...newTodo }),
  })),

  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    request: {
      status: 'error',
    },
    errorMessage: error,
  })),

  on(TodoActions.removeTodo, (state) => ({
    ...state,
    request: {
      status: 'loading',
    },
  })),

  on(TodoActions.removeTodoSuccess, (state, { deletedTodo }) => ({
    ...state,
    request: {
      status: 'success',
    },
    todos: state.todos?.filter((todo) => todo.id !== deletedTodo.id),
  })),

  on(TodoActions.removeTodoFailure, (state, { error }) => ({
    ...state,
    request: {
      status: 'error',
    },
    errorMessage: error,
  })),

  on(TodoActions.editTodo, (state) => ({
    ...state,
    request: {
      status: 'loading',
    },
  })),

  on(TodoActions.editTodoSuccess, (state, { editedTodo, newTodo }) => ({
    ...state,
    request: {
      status: 'success',
    },
    todos: state.todos?.map((todoElement) =>
      todoElement.id === editedTodo.id
        ? { ...todoElement, todo: newTodo }
        : todoElement
    ),
  })),

  on(TodoActions.editTodoFailure, (state, { error }) => ({
    ...state,
    request: {
      status: 'error',
    },
    errorMessage: error,
  })),

  on(TodoActions.selectTodo, (state, { selectedTodo }) => ({
    ...state,
    selectedTodo: selectedTodo,
  })),

  on(TodoActions.clearSelectTodo, (state) => ({
    ...state,
    selectedTodo: null,
  }))
);
