import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ROUTES } from './app/app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { httpInterceptor } from './interceptors/http.interceptor';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './app/state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import * as userEffects from './app/state/user-auth/user-auth.effects';
import * as todoEffects from './app/state/todos/todo.effects'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([httpInterceptor, authInterceptor])),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(userEffects, todoEffects)
],
});
