import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getUserList, State, inProgress, loadingUserList } from './store';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css']
})
export class TableUsersComponent implements OnInit, OnInit {
  @Input() campaignId?: number;
  users$: Observable<User[]>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'action'];
  isLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.users$ = this.store.pipe(select(getUserList))
    this.isLoading$ = this.store.pipe(select(inProgress));
  }

  ngOnInit(): void {
    this.loadUserList();
  }

  ngOnDestroy(): void {}

  loadUserList() {
    this.store.dispatch(loadingUserList({}));
  }

}
