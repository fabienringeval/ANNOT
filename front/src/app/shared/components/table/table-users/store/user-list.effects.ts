import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingUserList,
    successLoadingUserList,
    errorLoadingUserList
} from './user-list.actions';
import { UserService } from 'src/app/core/http';
import { User } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadUserListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingUserList),
            exhaustMap(
                (
                    { pagination }:
                    { pagination?: Pagination }) =>
                    this.userService.loadUserList({ pagination })
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
        private userService: UserService
    ) {}
}
