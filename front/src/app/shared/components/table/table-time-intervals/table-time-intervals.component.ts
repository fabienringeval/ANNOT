import { Component, OnInit } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { TimeInterval } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State, getTotalTimeIntervals, loadingTimeIntervalList, getTimeIntervalList, inProgress } from './store';
import { Pagination } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-table-time-intervals',
  templateUrl: './table-time-intervals.component.html',
  styleUrls: ['./table-time-intervals.component.css']
})

export class TableTimeIntervalsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  pagination: Pagination = { page: 1, paginate: 25 }
  timeIntervals$: Observable<TimeInterval[]>;
  total$: Observable<number>;
  displayedColumns: string[] = ['id', 'label', 'value', 'action'];
  inProgress$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.inProgress$ = this.store.pipe(select(inProgress));
    this.timeIntervals$ = this.store.pipe(select(getTimeIntervalList));
    this.total$ = this.store.pipe(select(getTotalTimeIntervals));
  }

  ngOnInit(): void {
    this.loadTimeIntervalList()
  }

  loadTimeIntervalList(): void {
    this.store.dispatch(loadingTimeIntervalList({ pagination: this.pagination }));
  }
}
