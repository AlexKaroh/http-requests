import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { userSuccessSelector } from 'src/app/state/user-auth/user-auth.selector';

export const todoAuthGuard = () => {
  inject(Store)
    .select(userSuccessSelector)
    .pipe(
      take(1),
      map((status) => {
        return status ? true : inject(Router).navigate(['login']);
      })
    ).subscribe();
};
