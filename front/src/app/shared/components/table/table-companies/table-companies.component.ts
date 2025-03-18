import { Component, OnInit } from '@angular/core';
import { Observable,Subscription } from 'rxjs';
import { Company } from 'src/app/shared/models';
import { Store, select } from '@ngrx/store';
import { State, getTotalCompanies, loadingCompanyList, getCompanyList, inProgress } from './store';
import { Pagination } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-table-companies',
  templateUrl: './table-companies.component.html',
  styleUrls: ['./table-companies.component.css']
})

export class TableCompaniesComponent implements OnInit {
  subscriptions: Subscription[] = [];
  pagination: Pagination = { page: 1, paginate: 25 }
  companies$: Observable<Company[]>;
  total$: Observable<number>;
  displayedColumns: string[] = ['id', 'name', 'description', 'action'];
  inProgress$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.inProgress$ = this.store.pipe(select(inProgress));
    this.companies$ = this.store.pipe(select(getCompanyList));
    this.total$ = this.store.pipe(select(getTotalCompanies));
  }

  ngOnInit(): void {
    this.loadCompanyList()
  }

  loadCompanyList(): void {
    this.store.dispatch(loadingCompanyList({ pagination: this.pagination }));
  }
}
