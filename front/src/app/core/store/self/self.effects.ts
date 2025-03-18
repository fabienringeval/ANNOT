import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingUser,
    successLoadingUser,
    errorLoadingUser
} from './self.actions';
import { UserService } from 'src/app/core/http';
import { User } from 'src/app/shared/models';


@Injectable()
export class SelfEffects {

    loadingUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingUser),
            switchMap(() => this.userService.loadUser('me', { include: ['language'] }).pipe(
                map((user: User) => successLoadingUser({ user })),
                catchError(error => of(errorLoadingUser(error)))
            ))
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}
}
