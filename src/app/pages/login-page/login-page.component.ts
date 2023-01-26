import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  login$?: Subscription;
  unauthorized: boolean = false;

  usernameControl = ['', Validators.compose([
    Validators.required,
    Validators.minLength(3)
  ])];

  passwordControl = ['', Validators.compose([
    Validators.required,
    Validators.minLength(3)
  ])];

  form: FormGroup;
  busy: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService
  ) {
    this.form = formBuilder.group({
      username: this.usernameControl,
      password: this.passwordControl
    });
  }

  ngOnInit(): void {
  }

  submit() {
    let username = this.form.controls['username'].value;
    let password = this.form.controls['password'].value

    this.login$ = this.authenticationService.login(username, password)
      .pipe(
        catchError(
          (err: any) => {
            this.unauthorized = true;
            return err;
          }
        )
      )
      .subscribe(
        (data: any) => {
          this.localStorageService.setAccessToken(data)
          this.authenticationService.currentUserSubject.next(true);
          this.router.navigate(['/']);
        }
      );
  }

  ngOnDestroy(): void {
    this.login$?.unsubscribe();
  }
}
