import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    deletingCampaign,
    successDeletingCampaign,
    errorDeletingCampaign
} from './delete-campaign.actions';
import { CampaignService } from 'src/app/core/http';


@Injectable()
export class DeleteCampaignEffects {
    loadingCampaignList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingCampaign),
            exhaustMap(
                ({ campaignId }: { campaignId: number }) => this.campaignService.deleteCampaign({ campaignId })
                    .pipe(
                        map(() => successDeletingCampaign()),
                        catchError(error => of(errorDeletingCampaign(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
