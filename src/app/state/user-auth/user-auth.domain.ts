import { UserData } from 'src/interfaces/user-data';

type RequstStatus = 'loading' | 'success' | 'error';

export interface AuthState {
  user?: UserData;
  status?: RequstStatus;
  errorMessage?: string;
}
