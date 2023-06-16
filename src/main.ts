import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ROUTES } from './app/app.routes';
import { httpInterceptor } from './interceptors/http.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(withInterceptors([httpInterceptor])),
  ],
});


