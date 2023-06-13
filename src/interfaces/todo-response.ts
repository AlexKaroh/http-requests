import { Todo } from "./todo";

export interface TodoResponse {
  limit: number;
  skip: number;
  todos: Todo[];
  total: number;
}
