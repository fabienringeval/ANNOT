import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-campaigns-sheet-information',
  templateUrl: './campaigns-sheet-information.component.html',
  styleUrls: ['./campaigns-sheet-information.component.css']
})
export class CampaignsSheetInformationComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  campaignId: number;

  constructor(private route: ActivatedRoute) {
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