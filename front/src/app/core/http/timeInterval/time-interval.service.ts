import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

import { VianoteApiClient } from 'src/app/core/clients';
import { TimeInterval } from 'src/app/shared/models';
import { TimeIntervalAdapter } from 'src/app/shared/adapters'
import { Pagination } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class TimeIntervalService {
    constructor(
        private httpClient: VianoteApiClient,
        private timeIntervalAdapter: TimeIntervalAdapter
    ) {}

    loadTimeInterval({ timeIntervalId }: { timeIntervalId: number }): Observable<TimeInterval> {
        return this.httpClient.Get(`v1/time-intervals/${timeIntervalId}`).pipe( map(({ data }) =>  this.timeIntervalAdapter.adapt(data)));
    }

    deleteTimeInterval({ timeIntervalId }: { timeIntervalId: number }): Observable<void> {
        return this.httpClient.Delete(`v1/time-intervals/${timeIntervalId}`);
    }

    loadTimeIntervalList({ pagination: { page, paginate } }: { pagination?: Pagination } = { pagination: { page: 1, paginate: 'all' } }): Observable<{ timeIntervals: TimeInterval[], total: number}> {
        return this.httpClient.Get(`v1/time-intervals?page=${page}&paginate=${paginate}`).pipe(
            map(
                ({ data: [...timeIntervals], meta: { total } }: {
                    data,
                    meta: { total: number }
                }) => ({
                  timeIntervals: _.map(timeIntervals, data => this.timeIntervalAdapter.adapt(data)),
                  total
              })
            )
        );
    }
    
    createTimeInterval({
        label,
        value
    }: { 
        label: string,
        value: number
    }): Observable<TimeInterval> {
        let params = { label, value }
        return this.httpClient.Post('v1/time-intervals', params);
    }
}
