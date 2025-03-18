import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/shared/models';
import { State, creatingCompany, companyCreationDone } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-form-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})


export class CompanyCreateComponent implements OnInit, OnDestroy {
  @Output() created: EventEmitter<boolean> = new EventEmitter();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];

  companies$: Observable<Company[]>;

  created$: Observable<boolean>;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private store: Store<State>) {
    this.created$ = this.store.pipe(select(companyCreationDone))

    this.subscriptions.push(this.created$.subscribe(done => {
      if(done) {
        this.created.emit(true)
      }
    }))
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  validForm() {
    return !this.form.controls.name.errors &&
      !this.form.controls.description.errors
  }

  submitForm() {
    if(this.validForm()) {
      let params = {
        name: this.form.controls.name.value,
        description: this.form.controls.description.value
      }
      
      this.store.dispatch(creatingCompany(params))
    }
  }

  abort() {
    this.aborted.emit(true);
  }
}
