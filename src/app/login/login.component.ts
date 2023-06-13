import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userDataForm: FormGroup = this.fb.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]],
  });
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService
  ) {}

  get isAuthInvalid() {
    return this.httpService.isAuthInvalid;
  }

  set isAuthInvalid(value) {
    this.httpService.isAuthInvalid = value;
  }

  public auth() {
    if (this.userDataForm.invalid) {
      this.userDataForm.markAllAsTouched();
      return;
    }
    const username = this.userDataForm.get('username')?.value;
    const password = this.userDataForm.get('password')?.value;
    this.isLoading = true;
    this.isAuthInvalid = false;
    this.httpService.userAuth(username, password).subscribe({
      next: () => {
        this.isLoading = false;
      },
    });
  }
}
