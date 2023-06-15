import { HttpInterceptorFn } from '@angular/common/http';

export const HttpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const setHeaderReq = req.clone({
    setHeaders: { 'Content-Type': 'application/json' },
  });
  return next(setHeaderReq);
};
