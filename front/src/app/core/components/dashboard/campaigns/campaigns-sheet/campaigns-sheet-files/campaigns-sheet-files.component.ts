import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-campaigns-sheet-files',
  templateUrl: './campaigns-sheet-files.component.html',
  styleUrls: ['./campaigns-sheet-files.component.css']
})
export class CampaignsSheetFilesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  campaignId: number;

  constructor( private route: ActivatedRoute ) {
    this.subscriptions.push(
      this.route.parent.params.subscribe(params => {
        this.campaignId = params.id;
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
