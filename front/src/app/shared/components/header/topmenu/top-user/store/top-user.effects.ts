import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingUserInfo,
    successLoadingUserInfo,
    errorLoadingUserInfo
} from './top-user.actions';
import { UserService } from 'src/app/core/http';


@Injectable()
export class TopUserEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingUserInfo),
            exhaustMap(
                () =>
                    this.userService.loadInfos()
                    .pipe(
                        map(({ firstName, lastName }: { firstName: string, lastName: string }) =>
                            successLoadingUserInfo({ firstName, lastName })),
                        catchError(error => of(errorLoadingUserInfo(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}
}
