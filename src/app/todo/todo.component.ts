import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../services/http.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  

  constructor(private httpService: HttpService, private router: Router) {
    this.httpService.getUserToDo(sessionStorage.getItem('id')!).subscribe();
  }

  signOut() {
    sessionStorage.removeItem('id');
    this.router.navigate(['login']);
  }
}
