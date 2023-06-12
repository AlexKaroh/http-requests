import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
 constructor (private httpService: HttpService) {
  this.httpService.getUserToDo(this.httpService.userId as number).subscribe();
 }

 get userToken() {
  return this.httpService.userToken;
 }
}
