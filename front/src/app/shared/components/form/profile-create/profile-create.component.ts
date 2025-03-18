import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { State, creatingProfile, profileCreationDone } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-form-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.css']
})


export class ProfileCreateComponent implements OnInit, OnDestroy {
  @Output() created: EventEmitter<boolean> = new EventEmitter();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];

  created$: Observable<boolean>;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    labels: new FormArray([ new FormControl(), new FormControl()])
  });

  get labels() {
    return this.form.get('labels') as FormArray;
  }

  constructor(private store: Store<State>) {
    this.created$ = this.store.pipe(select(profileCreationDone))

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
      !this.form.controls.description.errors;
  }

  submitForm() {
    if(this.validForm()) {
      const params = {
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        labels: this.form.controls.labels.value
      }

      this.store.dispatch(creatingProfile(params))
    }
  }

  abort() {
    this.aborted.emit(true);
  }

  addLabel() {
    this.labels.push(new FormControl());
  }

  removeLabel(position) {
    this.labels.removeAt(position);
  }
}
