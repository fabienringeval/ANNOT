import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingUserList,
    successLoadingUserList,
    errorLoadingUserList,
    addingUsers,
    successAddingUsers,
    errorAddingUsers
} from './user-add.actions';
import { User } from 'src/app/shared/models';
import { UserService, CampaignService } from 'src/app/core/http';


@Injectable()
export class AddUsersEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingUserList),
            exhaustMap(
                () => this.userService.loadUserList({ pagination: { paginate: 'all' }})
                    .pipe(
                        map(({ users }: { users: User[] }) => successLoadingUserList({ users })),
                        catchError(error => of(errorLoadingUserList(error)))
                    )
            )
        )
    );

    addingUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addingUsers),
            exhaustMap(
                ({ campaignId, users }: { campaignId: number, users: User[] }) => this.campaignService.addUsers({ campaignId, users })
                    .pipe(
                        map(() => successAddingUsers()),
                        catchError(error => of(errorAddingUsers(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private campaignService: CampaignService
    ) {}
}
