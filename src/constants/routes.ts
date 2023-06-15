import { Routes } from '@angular/router';
import { todoAuthGuard } from 'src/guards/todo-auth.guard';

export const ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../app/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'todo',
    canActivate: [todoAuthGuard],
    loadComponent: () =>
      import('../app/todo/todo.component').then(
        (mod) => mod.TodoComponent
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];