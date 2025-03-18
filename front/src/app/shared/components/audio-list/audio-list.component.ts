import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Audio } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State, getAudioList, loadingAudios, getTotalAudios } from './store';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  
  @Input() campaignId: number;
  @Output() selected: EventEmitter<Audio> = new EventEmitter();

  pageIndex: number = 0;
  
  audios$: Observable<Audio[]>;
  totalAudios$: Observable<number>;
  selectedAudio: Audio;
  totalAnnoted: number = 0;


  alertNoFiles: boolean = false;

  constructor(private store: Store<State>) {
    this.audios$ = this.store.pipe(select(getAudioList))
    this.totalAudios$ = this.store.pipe(select(getTotalAudios))

    this.subscriptions.push(
      this.audios$.subscribe(audios => {
        if(audios) {
          const audiosAnnoted =  _.where(audios, {annotated: true});
          this.totalAnnoted = audiosAnnoted.length;
          console.log(this.totalAnnoted);
          this.selectedAudio = _.find(audios, audio => !audio.annotated);
          if ( this.selectedAudio ) {
            this.selected.emit(this.selectedAudio);
          } else {
            this.selected.emit(null);
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadAudioList();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  select(audio: Audio) {
    this.selectedAudio = audio;
    this.selected.emit(audio);
  }

  loadAudioList() {
    this.store.dispatch(loadingAudios({ campaignId: this.campaignId }));
  }
}
