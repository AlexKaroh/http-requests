import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

console.warn("Request module loaded")
@NgModule({
  declarations: [
    LoginComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
