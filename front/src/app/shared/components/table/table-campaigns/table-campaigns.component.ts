import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Campaign } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State } from './store';
import { loadingCampaignList, getCampaignList } from './store';

import { Role } from 'src/app/shared/models';
import { getRoles } from 'src/app/core/store/role';
import * as _ from 'underscore';
@Component({
  selector: 'app-table-campaigns',
  templateUrl: './table-campaigns.component.html',
  styleUrls: ['./table-campaigns.component.css']
})
export class TableCampaignsComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;
  displayedColumns: string[] = ['id', 'name', 'audioCount', 'audioAnnoted', 'audioToAnnoted', 'action', 'actionSuivante'];
  roles$: Observable<Role[]>;
  roles: Role[];
  subscriptions: Subscription[] = [];
  loading = false;

  constructor(private store: Store<State>) {
    this.campaigns$ = this.store.pipe(select(getCampaignList));

    this.roles$ = this.store.pipe(select(getRoles));
    this.subscriptions.push(
      this.roles$.subscribe(roles => {
        if (roles) {
          this.roles = roles;
          this.loading = true;
          if ( this.roleShow('ROLE_AGENT') ) {
            this.displayedColumns = ['id', 'name', 'audioCount', 'audioAnnoted', 'audioToAnnoted', 'action'];
          }
          if ( this.roleShow('ROLE_MANAGER') ) {
            this.displayedColumns = ['id', 'name', 'audioCount', 'audioAnnoted', 'audioToAnnoted', 'action', 'actionSuivante'];
          }
        }
      })
    )

  }

  roleShow(name) {
    const effectRole = _.find(this.roles, role => role === name);
    return effectRole ? true : false;
  }

  ngOnInit(): void {
    this.loadCampaignList();
  }

  loadCampaignList() {
    this.store.dispatch(loadingCampaignList({ pagination: { page: 1, paginate: 25 } }));
  }
}
