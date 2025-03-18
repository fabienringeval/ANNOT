import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingProfileList,
    successLoadingProfileList,
    errorLoadingProfileList
} from './profile-list.actions';
import { ProfileService } from 'src/app/core/http';
import { Profile } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadProfileListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingProfileList),
            exhaustMap(
                (
                    { pagination  }:
                    { pagination?: Pagination }) =>
                    this.profileService.loadProfileList({ pagination })
                    .pipe(
                        map(({ profiles, total }: { profiles: Profile[], total: number }) =>
                            successLoadingProfileList({ profiles, total })),
                        catchError(error => of(errorLoadingProfileList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private profileService: ProfileService
    ) {}
}
