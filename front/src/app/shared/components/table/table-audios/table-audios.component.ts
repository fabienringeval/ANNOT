import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { Audio } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State } from './store';
import { loadingAudioList, getAudioList, getTotalAudios } from './store'
import { Pagination } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-table-audios',
  templateUrl: './table-audios.component.html',
  styleUrls: ['./table-audios.component.css']
})

export class TableAudiosComponent implements OnInit {
  subscriptions: Subscription[] = [];
  @Input() campaignId: number;
  pagination: Pagination = { page: 1, paginate: 25 }
  audios$: Observable<Audio[]>;
  total$: Observable<number>;
  displayedColumns: string[] = ['id', 'name', 'type', 'size', 'action'];
  isLoading = true;
  audioLength = 0;

  constructor(private store: Store<State>) {

    this.audios$ = this.store.pipe(select(getAudioList));
    this.total$ = this.store.pipe(select(getTotalAudios));

    this.subscriptions.push(
      this.audios$.subscribe((audio) => {
        if ( audio ) {
          this.isLoading = false;
        }
      })
    );
    this.subscriptions.push(
      this.total$.subscribe((total) => {
        if ( total ) {
          this.audioLength = total;
        }
      })
    );
  }

  ngOnInit(): void {
    this.loadAudioList()
  }

  loadAudioList(): void {
    this.store.dispatch(loadingAudioList({ campaignId: this.campaignId , pagination: this.pagination }));
  }

  changePagination(event){
    this.pagination = { page: event.pageIndex, paginate : event.pageSize };
    this.loadAudioList();
  }
}
