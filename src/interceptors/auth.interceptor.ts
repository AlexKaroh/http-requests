import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { userTokenSelector } from 'src/app/state/user-auth/user-auth.selector';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return inject(Store)
    .select(userTokenSelector)
    .pipe(
      switchMap((userToken) => {
        const modifiedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${userToken}` },
          withCredentials: false,
        });
        return req.withCredentials ? next(modifiedReq) : next(req);
      })
    );
};
