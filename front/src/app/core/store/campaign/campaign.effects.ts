import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    endingCampaign,
    successEndingCampaign,
    errorEndingCampaign,
    startingCampaign,
    successStartingCampaign,
    errorStartingCampaign,
    loadingCampaign,
    successLoadingCampaign,
    errorLoadingCampaign,
    deletingCampaign,
    successDeletingCampaign,
    errorDeletingCampaign,
    loadingEmotions,
    successLoadingEmotions,
    errorLoadingEmotions
} from './campaign.actions';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CampaignService } from '../../http/campaign/campaign.service';
import { Campaign, Emotion, Audio } from 'src/app/shared/models';

@Injectable()
export class CampaignEffects {

    loadingCampaign$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingCampaign),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.loadCampaign({ campaignId })
                .pipe(
                    map((campaign: Campaign) => successLoadingCampaign({ campaign })),
                    catchError(error => of(errorLoadingCampaign({ error })))
                )
            )
        )
    );

    loadingCampaignAudios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingEmotions),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.loadCampaignEmotionList({ campaignId })
                .pipe(
                    map(({ emotions }: { emotions: Emotion[] }) => successLoadingEmotions({ emotions })),
                    catchError(error => of(errorLoadingEmotions({ error })))
                )
            )
        )
    );

    endingCampaign$ = createEffect(() =>
        this.actions$.pipe(
            ofType(endingCampaign),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.endCampaign({ campaignId })
                .pipe(
                    map(() => successEndingCampaign()),
                    catchError(error => of(errorEndingCampaign({ error })))
                )
            )
        )
    );

    startingCampaign$ = createEffect(() =>
        this.actions$.pipe(
            ofType(startingCampaign),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.startCampaign({ campaignId })
                .pipe(
                    map(() => successStartingCampaign()),
                    catchError(error => of(errorStartingCampaign({ error })))
                )
            )
        )
    );

    deletingCampaign$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingCampaign),
            exhaustMap(({ campaignId }: { campaignId: number }) =>
                this.campaignService.deleteCampaign({ campaignId })
                .pipe(
                    map(() => successDeletingCampaign()),
                    catchError(error => of(errorDeletingCampaign({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
