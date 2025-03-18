import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    creatingEmotion,
    successCreatingEmotion,
    errorCreatingEmotion
} from './emotion-create.actions';
import { Emotion } from 'src/app/shared/models';
import { EmotionService } from 'src/app/core/http';


@Injectable()
export class CreateEmotionEffects {
    creatingEmotion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(creatingEmotion),
            exhaustMap(
                (
                    {
                        name,
                        description,
                        //image
                    }:
                    {
                        name: string,
                        description: string,
                        //image: string
                    }
                ) => this.emotionService.createEmotion({
                    name,
                    description,
                    //image
                    })
                    .pipe(
                        map((emotion: Emotion) => successCreatingEmotion({ emotion })),
                        catchError(error => of(errorCreatingEmotion(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private emotionService: EmotionService
    ) {}
}
