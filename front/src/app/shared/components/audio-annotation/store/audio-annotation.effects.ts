import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    addingEmotionalAnalysisAnnotations,
    successAddingEmotionalAnalysisAnnotations,
    errorAddingEmotionalAnalysisAnnotations,
    addingProfileAnnotations,
    successAddingProfileAnnotations,
    errorAddingProfileAnnotations,
    addingEmotionalSummaryAnnotations,
    successAddingEmotionalSummaryAnnotations,
    errorAddingEmotionalSummaryAnnotations
} from './audio-annotation.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { AudioService } from 'src/app/core/http';
import { EmotionalAnalysisAnnotation, Audio } from 'src/app/shared/models';
import { ProfileAnnotation } from 'src/app/shared/models/profile-annotation.model';
import * as _ from 'underscore';
import {EmotionalSummaryAnnotation} from '../../../models/emotional-summary-annotation';

@Injectable()
export class AudioAnnotationEffects {

    addingEmotionalAnalysisAnnotation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addingEmotionalAnalysisAnnotations),
            exhaustMap((
                { audio, annotations }:
                {
                    audio: Audio,
                    annotations: {
                        emotionId: number,
                        annotations: { value: number, timestamp: Date }[]
                    }[]
                }) =>
                from<any>(
                    Promise.all(
                        _.map(
                            annotations,
                            annotation => this.audioService.addEmotionAnnotations({ audioId: audio.id, ...annotation })
                        )
                    )
                )
                .pipe(
                    map((emotionalAnnotations: EmotionalAnalysisAnnotation[][]) => successAddingEmotionalAnalysisAnnotations({ emotionalAnnotations })),
                    catchError(error => of(errorAddingEmotionalAnalysisAnnotations({ error })))
                )
            )
        )
    );

    /*addingSummaryAnnotations$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(addingEmotionalSummaryAnnotations),
                exhaustMap(({audioId, emotionId,  value}: { audioId: number, value: number }) =>
                    this.audioService.addEmotionSummaryAnnotations({audioId, emotionId, value})
                        .pipe(
                            map((emotionnalSummaryAnnotation: EmotionalSummaryAnnotation[]) =>
                                successAddingEmotionalSummaryAnnotations({emotionalSummaryAnnotations})),
                            catchError(error => of(errorAddingEmotionalSummaryAnnotations({error})))
                        )
                )
            );
        }
    );*/



    addingProfileAnnotations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addingProfileAnnotations),
            exhaustMap(({ audioId, profiles }: { audioId: number, profiles: { profileId: number, labelId: number, value: number}[] }) =>
                this.audioService.addProfileAnnotations({ audioId, profiles })
                .pipe(
                    map((profiles: ProfileAnnotation[]) => successAddingProfileAnnotations({ profiles })),
                    catchError(error => of(errorAddingProfileAnnotations({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private audioService: AudioService
    ) {}
}
