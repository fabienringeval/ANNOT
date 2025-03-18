import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingEmotionList,
    successLoadingEmotionList,
    errorLoadingEmotionList
} from './emotion-list.actions';
import { EmotionService } from 'src/app/core/http';
import { Emotion } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadEmotionListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingEmotionList),
            exhaustMap(
                (
                    { pagination  }:
                    { pagination: Pagination }) =>
                    this.emotionService.loadEmotionList({ pagination })
                    .pipe(
                        map(({ emotions, total }: { emotions: Emotion[], total: number }) =>
                            successLoadingEmotionList({ emotions, total })),
                        catchError(error => of(errorLoadingEmotionList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private emotionService: EmotionService
    ) {}
}
