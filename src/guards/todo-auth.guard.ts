import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { userIdSelector } from 'src/app/state/user-auth/user-auth.selector';

export const todoAuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(Store)
    .select(userIdSelector)
    .pipe(
      map((id) => {
        return id ? true : router.createUrlTree(['login']);
      })
    );
};
