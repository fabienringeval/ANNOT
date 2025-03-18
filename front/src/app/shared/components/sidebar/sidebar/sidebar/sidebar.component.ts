import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/core/store';

import { Role } from 'src/app/shared/models';
import { getRoles } from 'src/app/core/store/role';
import * as _ from 'underscore';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roles$: Observable<Role[]>;
  roles: Role[];
  subscriptions: Subscription[] = [];

  loading = false;

  constructor(
    private store: Store<State>) {

    this.roles$ = this.store.pipe(select(getRoles));
    this.subscriptions.push(
      this.roles$.subscribe(roles => {
        if (roles) {
          this.roles = roles;
          this.loading = true;
        }
      })
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  roleShow(name) {
    const effectRole = _.find(this.roles, role => role === name);
    return effectRole ? true : false;
  }
}
