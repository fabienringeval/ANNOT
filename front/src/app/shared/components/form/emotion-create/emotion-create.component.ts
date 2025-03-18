import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Company } from 'src/app/shared/models';
import { State, creatingEmotion, emotionCreationDone } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-form-emotion-create',
  templateUrl: './emotion-create.component.html',
  styleUrls: ['./emotion-create.component.css']
})


export class EmotionCreateComponent implements OnInit, OnDestroy {
  @Output() created: EventEmitter<boolean> = new EventEmitter();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<boolean> = new EventEmitter();
  subscriptions: Subscription[] = [];

  companies$: Observable<Company[]>;

  created$: Observable<boolean>;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //image: new FormControl('', [Validators.required])
  });

  constructor(private store: Store<State>) {
    this.created$ = this.store.pipe(select(emotionCreationDone));

    this.subscriptions.push(this.created$.subscribe(done => {
      if (done) {
        this.created.emit(true);
      }
    }));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  validForm() {
    return !this.form.controls.name.errors &&
      !this.form.controls.description.errors; //&& !this.form.controls.image.errors;
  }

  submitForm() {
    if (this.validForm()) {
      const params = {
        name: this.form.controls.name.value,
        description: this.form.controls.description.value
        //image: this.form.controls.image.value
      };

      this.store.dispatch(creatingEmotion(params));
    }
  }

  abort() {
    this.aborted.emit(true);
  }

  onFileChange(event) {
    if (event.target.files > 0){
      const file = event.target.file[0];
      this.form.patchValue({
        image: file.value
      });
    }

    //console.log(file.link);

  }
}
