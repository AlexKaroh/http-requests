import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const todoAuthGuard = () => {
  if (sessionStorage.getItem('id')) {
    return true;
  }
  return inject(Router).createUrlTree(['login']);
};
