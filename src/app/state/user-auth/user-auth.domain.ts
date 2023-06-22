import { UserData } from 'src/interfaces/user-data';

type RequestStatus = 'loading' | 'success' | 'error';

export interface AuthState {
  user?: UserData;
  status?: RequestStatus;
  errorMessage?: string;
}
