import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    creatingTimeInterval,
    successCreatingTimeInterval,
    errorCreatingTimeInterval
} from './time-interval-create.actions';
import { TimeInterval } from 'src/app/shared/models';
import { TimeIntervalService } from 'src/app/core/http';


@Injectable()
export class CreateTimeIntervalEffects {
    creatingTimeInterval$ = createEffect(() =>
        this.actions$.pipe(
            ofType(creatingTimeInterval),
            exhaustMap(
                (
                    {
                        label,
                        value
                    }:
                    {
                        label: string,
                        value: number
                    }
                ) => this.timeIntervalService.createTimeInterval({
                    label,
                    value
                    })
                    .pipe(
                        map((timeInterval: TimeInterval) => successCreatingTimeInterval({ timeInterval })),
                        catchError(error => of(errorCreatingTimeInterval(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private timeIntervalService: TimeIntervalService
    ) {}
}
