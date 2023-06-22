import { Todo } from './todo';

export interface UserTodos {
  limit?: number;
  skip?: number;
  todos: Todo[];
  total?: number;
}
