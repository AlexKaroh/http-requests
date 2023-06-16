import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from 'src/services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const setHeaderAuth = req.clone({
    setHeaders: { Authorization: `Bearer ${inject(UserService).userToken}` },
  });

  return req.withCredentials
    ? next(setHeaderAuth.clone({ withCredentials: false }))
    : next(req);
};
