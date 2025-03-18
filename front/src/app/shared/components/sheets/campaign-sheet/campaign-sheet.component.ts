import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Campaign, Profile, Emotion, TimeInterval, SliderConfiguration } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { 
  State,
  loadingProfileList,
  loadingEmotionList,
  loadingTimeInterval,
  loadingSliderConfig,
  getTimeInterval,
  getSliderConfig,
  loadingCampaign,
  getCampaign,
  getEmotions,
  getProfiles,
  reset
} from './store';
import {  } from './store';

@Component({
  selector: 'app-campaign-sheet',
  templateUrl: './campaign-sheet.component.html',
  styleUrls: ['./campaign-sheet.component.css']
})
export class CampaignSheetComponent implements OnInit, OnDestroy {
  @Input() campaignId: number;

  subscriptions: Subscription[] = [];

  campaign$: Observable<Campaign>;
  profiles$: Observable<Profile[]>;
  emotions$: Observable<Emotion[]>;
  timeInterval$: Observable<TimeInterval>;
  sliderConfig$: Observable<SliderConfiguration>;
  finishedLoading = true;

  constructor(private store: Store<State>) {
    this.campaign$ = this.store.pipe(select(getCampaign));
    this.emotions$ = this.store.pipe(select(getEmotions));
    this.profiles$ = this.store.pipe(select(getProfiles));
    this.timeInterval$ = this.store.pipe(select(getTimeInterval));
    this.sliderConfig$ = this.store.pipe(select(getSliderConfig));

    this.subscriptions.push(this.campaign$.subscribe(campaign => {
      if(campaign) {
        this.store.dispatch(loadingProfileList({ campaignId: this.campaignId }));
        this.store.dispatch(loadingEmotionList({ campaignId: this.campaignId }));
        this.store.dispatch(loadingTimeInterval({ campaignId: this.campaignId }));
        this.store.dispatch(loadingSliderConfig({ campaignId: this.campaignId }));
      }
    }))
  }

  ngOnInit(): void {
    this.store.dispatch(loadingCampaign({ campaignId: this.campaignId }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(reset());
  }
}
