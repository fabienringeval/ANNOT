import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    deletingEmotion,
    successDeletingEmotion,
    errorDeletingEmotion
} from './delete-emotion.actions';
import { EmotionService } from 'src/app/core/http';


@Injectable()
export class DeleteEmotionEffects {
    loadingEmotionList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingEmotion),
            exhaustMap(
                ({ emotionId }: { emotionId: number }) => this.emotionService.deleteEmotion({ emotionId })
                    .pipe(
                        map(() => successDeletingEmotion()),
                        catchError(error => of(errorDeletingEmotion(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private emotionService: EmotionService
    ) {}
}
