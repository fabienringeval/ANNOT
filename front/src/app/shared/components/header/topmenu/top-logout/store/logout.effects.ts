import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loggingOut,
    successLoggingOut,
    errorLoggingOut,
    removingTokens
} from './logout.actions';
import { AuthService, TokenService } from 'src/app/core/services';


@Injectable()
export class LogoutEffects {
    loggingOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loggingOut),
            exhaustMap(
                () => this.authService.logout()
                    .pipe(
                        map(() => successLoggingOut()),
                        catchError(error => of(errorLoggingOut(error)))
                    )
            )
        )
    );

    removingTokens$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removingTokens),
            tap(() => this.tokenService.removeTokens())
        ),
        { dispatch: false }
    );
    
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private tokenService: TokenService
    ) {}
}
