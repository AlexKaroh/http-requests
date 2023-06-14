export interface Todo {
  completed: boolean;
  id: string;
  todo: string;
  userId: number;
  isEditable?: boolean;
}
