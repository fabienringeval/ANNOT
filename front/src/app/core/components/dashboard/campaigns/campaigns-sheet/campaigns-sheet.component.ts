import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaigns-sheet',
  templateUrl: './campaigns-sheet.component.html',
  styleUrls: ['./campaigns-sheet.component.css']
})
export class CampaignsSheetComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  campaignId: number;

  constructor(private route: ActivatedRoute) {
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.campaignId = params.id;
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
