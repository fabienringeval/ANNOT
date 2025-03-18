import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaigns-sheet-users',
  templateUrl: './campaigns-sheet-users.component.html',
  styleUrls: ['./campaigns-sheet-users.component.css']
})
export class CampaignsSheetUsersComponent implements OnInit {
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
