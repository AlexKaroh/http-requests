import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const setHeaderReq = req.clone({
    setHeaders: { 'Content-Type': 'application/json' },
  });

  return next(setHeaderReq).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      return throwError(() => errorResponse.error.message);
    })
  );
};
