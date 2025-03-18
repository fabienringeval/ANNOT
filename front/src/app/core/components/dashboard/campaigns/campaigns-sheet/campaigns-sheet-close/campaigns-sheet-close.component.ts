import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/core/store';
import { endingCampaign, startingCampaign, isActive, loadingCampaign, getCampaign, updated } from 'src/app/core/store/campaign';
import { Campaign } from 'src/app/shared/models';

@Component({
  selector: 'app-campaigns-sheet-close',
  templateUrl: './campaigns-sheet-close.component.html',
  styleUrls: ['./campaigns-sheet-close.component.css']
})

export class CampaignsSheetCloseComponent implements OnInit {
  endButtonValue = "Close this campaign";
  startButtonValue = "Open this campaign";
  subscriptions: Subscription[] = [];
  campaignId: number;

  isActive$: Observable<boolean>;
  isDeleted$: Observable<boolean>;
  campaign$: Observable<Campaign>;
  inProgress$: Observable<boolean>;
  done$: Observable<boolean>;
  error$: Observable<boolean>;
  updated$: Observable<boolean>;


  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.campaign$ = this.store.pipe(select(getCampaign));
    this.isActive$ = this.store.pipe(select(isActive));
    this.updated$ = this.store.pipe(select(updated));
    
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.campaignId = params.id;
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadingCampaign({ campaignId: this.campaignId }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  end() {
    this.store.dispatch(endingCampaign({ campaignId: this.campaignId }))
  }

  start() {
    this.store.dispatch(startingCampaign({ campaignId: this.campaignId }))
  }

}
