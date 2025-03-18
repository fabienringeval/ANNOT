import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/shared/models';
import { State, creatingTimeInterval, timeIntervalCreationDone } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-form-time-interval-create',
  templateUrl: './time-interval-create.component.html',
  styleUrls: ['./time-interval-create.component.css']
})


export class TimeIntervalCreateComponent implements OnInit, OnDestroy {
  @Output() created: EventEmitter<boolean> = new EventEmitter();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];

  companies$: Observable<Company[]>;

  created$: Observable<boolean>;

  form = new FormGroup({
    label: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  constructor(private store: Store<State>) {
    this.created$ = this.store.pipe(select(timeIntervalCreationDone))

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
    return !this.form.controls.label.errors &&
      !this.form.controls.value.errors
  }

  submitForm() {
    if(this.validForm()) {
      let params = {
        label: this.form.controls.label.value,
        value: this.form.controls.value.value
      }
      
      this.store.dispatch(creatingTimeInterval(params))
    }
  }

  abort() {
    this.aborted.emit(true);
  }
}
