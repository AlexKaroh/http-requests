import { Routes } from '@angular/router';
import { todoAuthGuard } from 'src/guards/todo-auth.guard';

export const ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'todo',
    canActivate: [todoAuthGuard],
    loadComponent: () =>
      import('./todo/todo.component').then(
        (mod) => mod.TodoComponent
      ),
  },
  {
    path: 'main',
    loadComponent: () =>
      import('./main/main.component').then(
        (mod) => mod.MainComponent
      ),
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];
