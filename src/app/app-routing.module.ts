import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginAuthGuard } from 'src/guards/login-auth.guard';
import { todoAuthGuard } from 'src/guards/todo-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginAuthGuard],
    loadComponent: () =>
      import('./login/login.component').then((component)=> component.LoginComponent)
  },
  {
    path: 'todo',
    canActivate: [todoAuthGuard],
    loadComponent: () =>
      import('./todo/todo.component').then((component)=> component.TodoComponent)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
