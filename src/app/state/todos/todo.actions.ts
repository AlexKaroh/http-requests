import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/interfaces/todo';
import { UserTodos } from 'src/interfaces/user-todos';

const COMPONENT_NAME = 'Todo';

export const loadTodos = createAction(
  `${COMPONENT_NAME} List Load`,
);

export const loadSuccess = createAction(
  `${COMPONENT_NAME} List Load Success`,
  props<{ userTodos: UserTodos }>()
);

export const loadFailure = createAction(
  `${COMPONENT_NAME} List Load Failure`,
  props<{ error: string }>()
);

export const addTodo = createAction(
  `${COMPONENT_NAME} Add`,
  props<{ todo: string; userId?: string }>()
);

export const addTodoSuccess = createAction(
  `${COMPONENT_NAME} Add Success`,
  props<{ newTodo: Todo }>()
);

export const addTodoFailure = createAction(
  `${COMPONENT_NAME} Add Failure`,
  props<{ error: string }>()
);

export const removeTodo = createAction(
  `${COMPONENT_NAME} Remove`,
  props<{ todoId: string }>()
);

export const removeTodoSuccess = createAction(
  `${COMPONENT_NAME} Remove Success`,
  props<{ deletedTodo: Todo }>()
);

export const removeTodoFailure = createAction(
  `${COMPONENT_NAME} Remove Failure`,
  props<{ error: string }>()
);

export const editTodo = createAction(
  `${COMPONENT_NAME} Edit`,
  props<{ todoId: string; newTodo: string }>()
);

export const editTodoSuccess = createAction(
  `${COMPONENT_NAME} Edit Success`,
  props<{ editedTodo: Todo; newTodo: string }>()
);

export const editTodoFailure = createAction(
  `${COMPONENT_NAME} Edit Failure`,
  props<{ error: string }>()
);

export const selectTodo = createAction(
  `${COMPONENT_NAME} Select`,
  props<{ selectedTodo: Todo }>()
);

export const clearSelectTodo = createAction(`${COMPONENT_NAME} Unselect`);
