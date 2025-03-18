import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaigns-sheet-export',
  templateUrl: './campaigns-sheet-export.component.html',
  styleUrls: ['./campaigns-sheet-export.component.css']
})
export class CampaignsSheetExportComponent implements OnInit, OnDestroy {
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
