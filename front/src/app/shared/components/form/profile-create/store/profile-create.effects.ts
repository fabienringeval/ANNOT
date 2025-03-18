import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    creatingProfile,
    successCreatingProfile,
    errorCreatingProfile
} from './profile-create.actions';
import { Profile } from 'src/app/shared/models';
import { ProfileService } from 'src/app/core/http';


@Injectable()
export class CreateProfileEffects {
    creatingProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(creatingProfile),
            exhaustMap(
                (
                    {
                        name,
                        description,
                        labels
                    }:
                    {
                        name: string,
                        description: string,
                        labels?: string[]
                    }
                ) => this.profileService.createProfile({
                    name,
                    description,
                    labels
                    })
                    .pipe(
                        map((profile: Profile) => successCreatingProfile({ profile })),
                        catchError(error => of(errorCreatingProfile(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private profileService: ProfileService
    ) {}
}
