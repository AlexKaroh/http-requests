import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../state/user-auth/user-auth.action';
import { selectErrorMessage, userLoadingSelector } from '../state/user-auth/user-auth.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  isRequestActive$ = this.store.select(userLoadingSelector);
  errorMessage$ = this.store.select(selectErrorMessage);

  userDataGroup = this.fb.nonNullable.group({
    username: ['kminchelle', [Validators.required]],
    password: ['0lelplR', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  public login() {
    if (this.userDataGroup.invalid) {
      this.userDataGroup.markAllAsTouched();
      return;
    }
    const username = this.userDataGroup.controls.username.value;
    const password = this.userDataGroup.controls.password.value;
    this.store.dispatch(login({ username: username, password: password }));
  }
}
