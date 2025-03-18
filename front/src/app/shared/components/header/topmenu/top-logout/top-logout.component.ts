import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, loggingOut, isLoggedOut, removingTokens } from './store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-logout',
  templateUrl: './top-logout.component.html',
  styleUrls: ['./top-logout.component.css']
})
export class TopLogoutComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  isLoggedOut$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.isLoggedOut$.subscribe(loggedOut => {
      if(loggedOut) {
        this.store.dispatch(removingTokens());
        window.location.assign('/login');
      }
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  logout() {
    this.store.dispatch(loggingOut());
  }

}
