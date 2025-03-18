import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingCampaignList,
    successLoadingCampaignList,
    errorLoadingCampaignList
} from './campaign-list.actions';
import { CampaignService } from 'src/app/core/http';
import { Campaign } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadCampaignListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingCampaignList),
            exhaustMap(
                (
                    { pagination  }:
                    { pagination?: Pagination }) =>
                    this.campaignService.loadCampaignList({ pagination })
                    .pipe(
                        map(({ campaigns, total }: { campaigns: Campaign[], total: number }) =>
                            successLoadingCampaignList({ campaigns, total })),
                        catchError(error => of(errorLoadingCampaignList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
