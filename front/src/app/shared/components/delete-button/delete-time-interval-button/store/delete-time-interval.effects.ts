import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    deletingTimeInterval,
    successDeletingTimeInterval,
    errorDeletingTimeInterval
} from './delete-time-interval.actions';
import { TimeIntervalService } from 'src/app/core/http';


@Injectable()
export class DeleteTimeIntervalEffects {
    loadingTimeIntervalList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingTimeInterval),
            exhaustMap(
                ({ timeIntervalId }: { timeIntervalId: number }) => this.timeIntervalService.deleteTimeInterval({ timeIntervalId })
                    .pipe(
                        map(() => successDeletingTimeInterval()),
                        catchError(error => of(errorDeletingTimeInterval(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private timeIntervalService: TimeIntervalService
    ) {}
}
