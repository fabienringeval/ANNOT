import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    deletingProfile,
    successDeletingProfile,
    errorDeletingProfile
} from './delete-profile.actions';
import { ProfileService } from 'src/app/core/http';


@Injectable()
export class DeleteProfileEffects {
    loadingProfileList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingProfile),
            exhaustMap(
                (
                    { profileId }:
                    { profileId: number }) => this.profileService.deleteProfile({ profileId })
                    .pipe(
                        map(() => successDeletingProfile()),
                        catchError(error => of(errorDeletingProfile(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private profileService: ProfileService
    ) {}
}
