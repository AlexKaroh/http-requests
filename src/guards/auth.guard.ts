import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { HttpService } from 'src/services/http.service';

export const authGuard: CanActivateFn = () => {
  if (inject(HttpService).userToken) return true;
  return false;
};
