import { Component, OnInit } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { Emotion } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State, getTotalEmotions, loadingEmotionList, getEmotionList, inProgress } from './store';
import { Pagination } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-table-emotions',
  templateUrl: './table-emotions.component.html',
  styleUrls: ['./table-emotions.component.css']
})

export class TableEmotionsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  pagination: Pagination = { page: 1, paginate: 25 }
  emotions$: Observable<Emotion[]>;
  total$: Observable<number>;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  inProgress$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.inProgress$ = this.store.pipe(select(inProgress));
    this.emotions$ = this.store.pipe(select(getEmotionList));
    this.total$ = this.store.pipe(select(getTotalEmotions));
  }

  ngOnInit(): void {
    this.loadEmotionList()
  }

  loadEmotionList(): void {
    this.store.dispatch(loadingEmotionList({ pagination: this.pagination }));
  }
}
