import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models';
import { State, getUserList, loadingUserList, addingUsers, done } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-add-users-form',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})


export class UserAddComponent implements OnInit, OnDestroy {
  @Input() campaignId: number;
  @Output() added: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];

  users$: Observable<User[]>;

  added$: Observable<boolean>;

  form = new FormGroup({ users: new FormControl('', [Validators.required]) });

  get users():User[] {
    return this.form.controls.users.value;
  }

  constructor(private store: Store<State>) {
    this.users$ = this.store.pipe(select(getUserList));
    this.added$ = this.store.pipe(select(done))

    this.subscriptions.push(this.added$.subscribe(done => {
      if(done) {
        this.added.emit(true)
      }
    }))
  }

  ngOnInit(): void {
    this.store.dispatch(loadingUserList());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  validForm() {
    return !this.form.controls.users.errors;
  }

  submitForm() {
    if(this.validForm()) {
      this.store.dispatch(addingUsers({
        campaignId: this.campaignId,
        users: this.users
      }))
    }
  }

  abort() {
    this.aborted.emit(true);
  }
}
