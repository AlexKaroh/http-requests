import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginAuthGuard = () => {
  if (sessionStorage.getItem('id')) {
    inject(Router).navigate(['todo']);
    return false;
  }
  return true;
};
