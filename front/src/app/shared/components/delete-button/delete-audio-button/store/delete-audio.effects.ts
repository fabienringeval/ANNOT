import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    deletingAudio,
    successDeletingAudio,
    errorDeletingAudio
} from './delete-audio.actions';
import { AudioService } from 'src/app/core/http';


@Injectable()
export class DeleteAudioEffects {
    loadingAudioList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingAudio),
            exhaustMap(
                (
                    { audioId }:
                    { audioId: number }) => this.audioService.deleteAudio({ audioId })
                    .pipe(
                        map(() => successDeletingAudio()),
                        catchError(error => of(errorDeletingAudio(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private audioService: AudioService
    ) {}
}
