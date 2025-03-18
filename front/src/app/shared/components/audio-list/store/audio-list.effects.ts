import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    loadingAudios,
    successLoadingAudios,
    errorLoadingAudios
} from './audio-list.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Audio } from 'src/app/shared/models';
import { CampaignService } from 'src/app/core/http';

@Injectable()
export class AudioListEffects {

    loadingCampaignEmotions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingAudios),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.loadCampaignAudioList({ campaignId })
                .pipe(
                    map(({ audios, total }: { audios: Audio[], total: number }) => successLoadingAudios({ audios, total })),
                    catchError(error => of(errorLoadingAudios({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
