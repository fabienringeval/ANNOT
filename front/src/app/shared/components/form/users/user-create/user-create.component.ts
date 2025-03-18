import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/shared/models';
import { State, getCompanies, loadingCompanyList, creatingUser, userCreationDone } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-form-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit, OnDestroy {
  @Output() created: EventEmitter<boolean> = new EventEmitter();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];

  companies$: Observable<Company[]>;

  created$: Observable<boolean>;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    company: new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required])
  });

  constructor(private store: Store<State>) {
    this.companies$ = this.store.pipe(select(getCompanies));
    this.created$ = this.store.pipe(select(userCreationDone))

    this.subscriptions.push(this.created$.subscribe(done => {
      if(done) {
        this.created.emit(true)
      }
    }))
  }

  ngOnInit(): void {
    this.store.dispatch(loadingCompanyList());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  validForm() {
    return !this.form.controls.email.errors &&
      !this.form.controls.firstName.errors &&
      !this.form.controls.lastName.errors &&
      !this.form.controls.company.errors &&
      !this.form.controls.password.errors;
  }

  submitForm() {
    if(this.validForm()) {
      let params = {
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        email: this.form.controls.email.value,
        company: this.form.controls.company.value,
        password: this.form.controls.password.value,
      }
      console.log(params)
      this.store.dispatch(creatingUser(params))
    }
  }

  abort() {
    this.aborted.emit(true);
  }
}
