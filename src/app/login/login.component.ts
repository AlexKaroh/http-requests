import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  userDataForm: FormGroup = this.fb.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  get errorMessage() {
    return this.httpService.errorMessage;
  }

  get isLoading$() {
    return this.httpService.isLoading$;
  }

  public auth() {
    if (this.userDataForm.invalid) {
      this.userDataForm.markAllAsTouched();
      return;
    }
    const username = this.userDataForm.get('username')?.value;
    const password = this.userDataForm.get('password')?.value;
    this.httpService.userAuth(username, password).subscribe();
  }
}
