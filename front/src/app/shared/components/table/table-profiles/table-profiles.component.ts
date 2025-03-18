import { Component, OnInit } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { Profile } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State } from './store';
import { loadingProfileList, getProfileList } from './store'
import { Pagination } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-table-profiles',
  templateUrl: './table-profiles.component.html',
  styleUrls: ['./table-profiles.component.css']
})

export class TableProfilesComponent implements OnInit {
  subscriptions: Subscription[] = [];
  pagination: Pagination = { page: 1, paginate: 25 }
  profiles$: Observable<Profile[]>;
  displayedColumns: string[] = ['id', 'name', 'description', 'labels', 'action'];
  isLoading = true;
  profileLength = 0;

  constructor(private store: Store<State>) {

    this.profiles$ = this.store.pipe(select(getProfileList));

    this.subscriptions.push(
      this.profiles$.subscribe((profile) => {
        if ( profile ) {
          this.profileLength = profile.length;
          this.isLoading = false;
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadProfileList()
  }

  loadProfileList(): void {
    this.store.dispatch(loadingProfileList({ pagination: this.pagination }));
  }
}
