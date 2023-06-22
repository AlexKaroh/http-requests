import { Todo } from 'src/interfaces/todo';

type RequestStatus = 'loading' | 'success' | 'error';

interface RequestState {
  status?: RequestStatus,
  isFirstRequest?: boolean
}

export interface TodosState {
  todos?: Todo[];
  selectedTodo?: Todo | null;
  request?: RequestState;
  errorMessage?: string;
  canRequest? : boolean;
}
