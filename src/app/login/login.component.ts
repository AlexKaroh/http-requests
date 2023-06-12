import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userDataForm: FormGroup = this.fb.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]],
  });
  isLoading = false;

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  get isRequestError() {
    return this.httpService.isRequestError;
  }

  set isRequestError(value) {
    this.httpService.isRequestError = value;
  }

  public auth() {
    if (this.userDataForm.invalid) {
      this.userDataForm.markAllAsTouched();
      return;
    }
    const username = this.userDataForm.get('username')?.value;
    const password = this.userDataForm.get('password')?.value;
    this.isLoading = true;
    this.isRequestError = false;
    this.httpService.userAuth(username, password).subscribe({
      next: () => {
        this.isLoading = false;
      }
    });
  }
}
