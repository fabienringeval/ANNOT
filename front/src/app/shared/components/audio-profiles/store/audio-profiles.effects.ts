import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList
} from './audio-profiles.actions';
import { CampaignService } from 'src/app/core/http';
import { Profile } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class AudioProfilesEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingProfileList),
            exhaustMap(
                (
                    { campaignId }:
                    { campaignId: number }) =>
                    this.campaignService.loadCampaignProfileList({ campaignId, pagination: { paginate: 'all' } })
                    .pipe(
                        map(({ profiles }: { profiles: Profile[] }) =>
                            successLoadingProfileList({ profiles })),
                        catchError(error => of(errorLoadingProfileList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
