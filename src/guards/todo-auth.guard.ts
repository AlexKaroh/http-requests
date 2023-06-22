import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { userIdSelector } from 'src/app/state/user-auth/user-auth.selector';

export const todoAuthGuard = () => {
  inject(Store)
    .select(userIdSelector)
    .pipe(
      take(1),
      map((id) => {
        return id ? true : inject(Router).navigate(['login']);
      })
    ).subscribe();
};
