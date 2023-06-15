import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private isRequestActive = new BehaviorSubject<boolean>(false);

  userDataGroup = this.fb.nonNullable.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]],
  });

  errorMessage = '';

  public get isRequestActive$() {
    return this.isRequestActive.asObservable();
  }

  private setRequestStatus(value: boolean) {
    this.isRequestActive.next(value);
  }

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  public login() {
    if (this.userDataGroup.invalid) {
      this.userDataGroup.markAllAsTouched();
      return;
    }
    this.setRequestStatus(true);
    const username = this.userDataGroup.controls.username.value;
    const password = this.userDataGroup.controls.password.value;
    this.httpService.userLogin(username, password).subscribe({
      next: () => {
        this.setRequestStatus(false);
      },
      error: (error) => {
        this.setRequestStatus(false), (this.errorMessage = error);
      },
    });
  }
}
