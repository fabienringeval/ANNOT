import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingTimeIntervalList,
    successLoadingTimeIntervalList,
    errorLoadingTimeIntervalList
} from './time-interval-list.actions';
import { TimeIntervalService } from 'src/app/core/http';
import { TimeInterval } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadTimeIntervalListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingTimeIntervalList),
            exhaustMap(
                (
                    { pagination  }:
                    { pagination: Pagination }) =>
                    this.emotionService.loadTimeIntervalList({ pagination })
                    .pipe(
                        map(({ timeIntervals, total }: { timeIntervals: TimeInterval[], total: number }) =>
                            successLoadingTimeIntervalList({ timeIntervals, total })),
                        catchError(error => of(errorLoadingTimeIntervalList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private emotionService: TimeIntervalService
    ) {}
}
