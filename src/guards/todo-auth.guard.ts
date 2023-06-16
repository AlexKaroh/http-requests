import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

export const todoAuthGuard = () => {
  if (inject(UserService).userId) {
    return true;
  }
  return inject(Router).createUrlTree(['login']);
};
