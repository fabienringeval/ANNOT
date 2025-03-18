import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { State, uploadingAudios, inProgress, uploading, associating, done, reset } from './store';
import { Store, select } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as _ from 'underscore';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})


export class AudioUploadComponent implements OnInit, OnDestroy {
  @Input() campaignId: number;
  @Output() uploaded: EventEmitter<boolean> = new EventEmitter();
  @Output() aborted: EventEmitter<void> = new EventEmitter();
  subscriptions: Subscription[] = [];
  
  inProgress$: Observable<boolean>;
  uploading$: Observable<boolean>;
  associating$: Observable<boolean>;
  done$: Observable<boolean>;
  
  selectedFiles: File[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  constructor(private store: Store<State>) {
    this.inProgress$ = this.store.pipe(select(inProgress));
    this.uploading$ = this.store.pipe(select(uploading));
    this.associating$ = this.store.pipe(select(associating));
    this.done$ = this.store.pipe(select(done));

    this.subscriptions.push(
      this.done$.subscribe(done => {
        if(done) {
          this.uploaded.emit(true);
        }
      })
    )
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(reset());
  }

  selectFiles(fileList: FileList) {
    this.selectedFiles = Array.from(fileList);
  }

  upload() {
    this.store.dispatch(uploadingAudios({ campaignId: this.campaignId, audios: this.selectedFiles}));
  }

  abort() {
    this.aborted.emit();
  }
}
