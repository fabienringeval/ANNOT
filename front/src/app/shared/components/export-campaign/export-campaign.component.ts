import { Component, OnInit, Input } from '@angular/core';
import { Audio } from 'src/app/shared/models';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getAudioList, State, inProgress, loadingAudiosList, reset } from './store';
import { ExportService } from 'src/app/core/services/export/export.service';
import { CampaignService } from 'src/app/core/http';
import { DatePipe } from '@angular/common';

import * as _ from 'underscore';

@Component({
  selector: 'app-export-campaign',
  templateUrl: './export-campaign.component.html',
  styleUrls: ['./export-campaign.component.css']
})
export class ExportCampaignComponent implements OnInit, OnInit {
  @Input() campaignId: number;
  subscriptions: Subscription[] = [];
  label = 'exporter';
  audios$: Observable<Audio[]>;
  isLoading$: Observable<boolean>;
  resultExport;
  myDate = new Date();
  exportInP = false;
  constructor(
    private store: Store<State>,
    private exportService: ExportService,
    private campaignsService: CampaignService,
    private datePipe: DatePipe
  ) {
    this.isLoading$ = this.store.pipe(select(inProgress));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(reset())
  }

  export(): void {
//    this.store.dispatch(loadingAudiosList({ campaignId: this.campaignId }));
    this.exportInP = true;
    this.resultExport =   this.campaignsService.export(this.campaignId) .subscribe( result => {
      const NameFile = 'annot_export_campaign_' + this.campaignId + '_' + this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss') + '.json';
      this.exportService.exportJsonToFile(NameFile, result);
      this.exportInP = false;
    });

  }

}
