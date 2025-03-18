import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, loadingUserInfo, getFirstName, getLastName } from './store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-top-user',
  templateUrl: './top-user.component.html',
  styleUrls: ['./top-user.component.css']
})
export class TopUserComponent implements OnInit {
  firstName$: Observable<string>;
  lastName$: Observable<string>;
  
  firstName: string;
  lastName: string;

  constructor(private store: Store<State>) {
    this.firstName$ = this.store.pipe(select(getFirstName));
    this.lastName$ = this.store.pipe(select(getLastName));
  }

  ngOnInit(): void {
    this.store.dispatch(loadingUserInfo());
  }

}
