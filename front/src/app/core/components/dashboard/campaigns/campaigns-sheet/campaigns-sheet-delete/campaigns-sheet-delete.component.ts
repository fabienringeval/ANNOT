import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaigns-sheet-delete',
  templateUrl: './campaigns-sheet-delete.component.html',
  styleUrls: ['./campaigns-sheet-delete.component.css']
})
export class CampaignsSheetDeleteComponent implements OnInit, OnDestroy {
  buttonValue = "Delete this campaign";
  subscriptions: Subscription[] = [];
  campaignId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
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

  deleted() {
    this.router.navigate(['annot/campaigns']);
  }
}