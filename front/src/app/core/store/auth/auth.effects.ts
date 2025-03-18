import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';

import {
    logging,
    successLogging,
    errorLogging,
    successSavingTokens,
    errorSavingTokens
} from './auth.actions';
import { AuthService } from 'src/app/core/http';
import { TokenService } from '../../services';
import { promise } from 'protractor';


@Injectable()
export class AuthEffects {

    logging$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logging),
            switchMap((
                { username, password }:
                { username: string, password: string }
            ) => this.authService.login(username, password).pipe(
                map(({ access_token, refresh_token }) => successLogging({ access_token, refresh_token })),
                catchError(error => of(errorLogging(error)))
            ))
        )
    );

    successLogging$ = createEffect(() =>
        this.actions$.pipe(
            ofType(successLogging),
            switchMap((
                { access_token, refresh_token }:
                { access_token: string, refresh_token: string }
            ) => 
            from<any>(of(this.tokenService.saveTokens(access_token, refresh_token)))
            .pipe(
                map(({ access_token, refresh_token }: { access_token: string, refresh_token: string }) => {
                    return successSavingTokens({ access_token, refresh_token })
                }),
                catchError(error => of(errorSavingTokens({ error })))
            ))
    ));

    constructor(
        private authService: AuthService,
        private tokenService: TokenService,
        private actions$: Actions
    ) {}
}
