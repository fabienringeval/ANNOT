import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../../store';
import { logging, getRefreshToken, getAccessToken, isLogged } from '../../store/auth';
import { Router } from '@angular/router';
import { loadingRole, isGranted } from '../../store/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  loginForm: FormGroup;
  loginError = false;
  logged$: Observable<boolean>;
  logged = false;

  refreshToken$: Observable<string>;
  refreshToken: string;

  accessToken$: Observable<string>;
  accessToken: string;

  granted$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.refreshToken$ = this.store.pipe(select(getRefreshToken));
    this.accessToken$ = this.store.pipe(select(getAccessToken));
    this.logged$ = this.store.pipe(select(isLogged));
    this.granted$ = this.store.pipe(select(isGranted));
    
    this.subscriptions.push(
      this.logged$.subscribe(logged => {
        if(logged) {
          this.logged = logged;
          this.store.dispatch(loadingRole());
        }
      })
    )
    
    this.subscriptions.push(
      this.granted$.subscribe(granted => {
        if(granted) {
          this.router.navigate(['/annot']);
        }
      })
    )
  }

  get username() {
    return this.loginForm.controls.username
  }

  get password() {
    return this.loginForm.controls.password
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  login() {
    this.loginError = false;
    this.store.dispatch(logging({ username: this.username.value, password: this.password.value }))
    this.loginForm.reset();
  }
}
