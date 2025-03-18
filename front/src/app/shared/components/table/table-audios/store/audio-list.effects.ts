import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingAudioList,
    successLoadingAudioList,
    errorLoadingAudioList
} from './audio-list.actions';
import { CampaignService } from 'src/app/core/http';
import { Audio } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadAudioListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingAudioList),
            exhaustMap(
                (
                    { campaignId, pagination  }:
                    { campaignId: number, pagination?: Pagination }) =>
                    this.campaignService.loadCampaignAudioList({ campaignId, pagination })
                    .pipe(
                        map(({ audios, total }: { audios: Audio[], total: number }) =>
                            successLoadingAudioList({ audios, total })),
                        catchError(error => of(errorLoadingAudioList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
