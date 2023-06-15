import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpService } from 'src/services/http.service';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {

  const httpService = inject(HttpService);

  const setHeaderReq = req.clone({
    setHeaders: { 'Content-Type': 'application/json' },
  });
  return next(setHeaderReq).pipe(
    catchError((errorResponse: HttpErrorResponse) => {
      httpService.errorMessage = errorResponse.error.message;
      httpService.setRequestStatus(false);
      throw errorResponse;
    })
  );
};
