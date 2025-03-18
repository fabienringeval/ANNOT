import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { State } from 'src/app/core/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Emotion, Audio, Campaign } from 'src/app/shared/models';
import { getEmotionList, loadingEmotions, getCampaign, loadingCampaign } from 'src/app/core/store/campaign';
import { AudioListComponent } from 'src/app/shared/components/audio-list/audio-list.component';

@Component({
  selector: 'app-campaigns-annotation',
  templateUrl: './campaigns-annotation.component.html',
  styleUrls: ['./campaigns-annotation.component.css']
})
export class CampaignsAnnotationComponent implements OnInit, OnDestroy {
  @ViewChild(AudioListComponent) audioList;

  subscriptions: Subscription[] = [];
 
  campaign$: Observable<Campaign>;
  emotions$: Observable<Emotion[]>;

  audios: Audio[];
  currentAudio: Audio;

  campaignId: number;

  loading = true;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.emotions$ = this.store.pipe(select(getEmotionList))
    this.campaign$ = this.store.pipe(select(getCampaign))

    // get current campaign id
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.campaignId = params.id;
        this.store.dispatch(loadingCampaign({ campaignId: this.campaignId }));
        this.store.dispatch(loadingEmotions({ campaignId: this.campaignId }));
      })

    );


  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  selectedAudio(audio: Audio): void {
    if ( audio ) {
      this.currentAudio = audio;
      this.loading = false;
    } else {
      this.loading = false;
    }

  }

  finished(): void {
    this.currentAudio = null;
    this.loading = true;
    this.audioList.loadAudioList();
    if ( this.audioList ) {
      this.loading = true;
    } else {
      this.loading = false;
    }
  }
}
