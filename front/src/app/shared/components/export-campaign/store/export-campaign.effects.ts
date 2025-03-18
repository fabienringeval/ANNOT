import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingAudiosList,
    successLoadingAudiosList,
    errorLoadingAudiosList
} from './export-campaign.actions';
import { CampaignService } from 'src/app/core/http';
import { Audio } from 'src/app/shared/models';


@Injectable()
export class ExportCampaignEffects {
    loadingAudioList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingAudiosList),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaignAudioList({ campaignId, include: ['emotionalAnalysisAnnotations'], pagination: { page: 1, paginate: 'all' } })
                    .pipe(
                        map(({ audios, total }: { audios: Audio[], total: number }) =>
                            successLoadingAudiosList({ audios, total })),
                        catchError(error => of(errorLoadingAudiosList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
