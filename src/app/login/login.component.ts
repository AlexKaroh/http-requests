import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private isRequestActive = new BehaviorSubject<boolean>(false);
  private subscription: Subscription = new Subscription();

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

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private userService: UserService,
    private router: Router
  ) {}

  public login() {
    if (this.userDataGroup.invalid) {
      this.userDataGroup.markAllAsTouched();
      return;
    }
    this.setRequestStatus(true);
    const username = this.userDataGroup.controls.username.value;
    const password = this.userDataGroup.controls.password.value;
    this.subscription = this.httpService
      .userLogin(username, password)
      .subscribe({
        next: (userData) => {
          this.setRequestStatus(false);
          this.userService.signIn(userData);
          this.router.navigate(['todo']);
        },
        error: (error) => {
          this.setRequestStatus(false);
          this.errorMessage = error;
        },
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
