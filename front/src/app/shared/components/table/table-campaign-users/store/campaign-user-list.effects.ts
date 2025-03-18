import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingUserList,
    successLoadingUserList,
    errorLoadingUserList
} from './campaign-user-list.actions';
import { CampaignService } from 'src/app/core/http';
import { User } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadCampaignUserListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingUserList),
            exhaustMap(
                (
                    { campaignId, pagination }:
                    { campaignId: number, pagination?: Pagination }) =>
                    this.campaignService.loadCampaignUserList({ campaignId, pagination })
                    .pipe(
                        map(({ users, total }: { users: User[], total: number }) =>
                            successLoadingUserList({ users, total })),
                        catchError(error => of(errorLoadingUserList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private campaignService: CampaignService
    ) {}
}
