import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getUserList, State, inProgress, loadingUserList } from './store';

@Component({
  selector: 'app-table-campaign-users',
  templateUrl: './table-campaign-users.component.html',
  styleUrls: ['./table-campaign-users.component.css']
})
export class TableCampaignUsersComponent implements OnInit, OnInit {
  @Input() campaignId: number;
  users$: Observable<User[]>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
  isLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.users$ = this.store.pipe(select(getUserList))
    this.isLoading$ = this.store.pipe(select(inProgress));
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {}

  loadUsers() {
    this.store.dispatch(loadingUserList({ campaignId: this.campaignId }))
  }
}
