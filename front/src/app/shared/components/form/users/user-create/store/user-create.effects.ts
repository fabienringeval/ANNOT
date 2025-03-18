import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingCompanyList,
    successLoadingCompanyList,
    errorLoadingCompanyList,
    creatingUser,
    successCreatingUser,
    errorCreatingUser
} from './user-create.actions';
import { Company, User } from 'src/app/shared/models';
import { CompanyService, UserService } from 'src/app/core/http';


@Injectable()
export class CreateUserEffects {
    loadingCompanyList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingCompanyList),
            exhaustMap(
                () => this.companyService.loadCompanyList()
                    .pipe(
                        map(({ companies }: { companies: Company[] }) => successLoadingCompanyList({ companies })),
                        catchError(error => of(errorLoadingCompanyList(error)))
                    )
            )
        )
    );

    creatingUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(creatingUser),
            exhaustMap(
                (
                    {
                        firstName,
                        lastName,
                        email,
                        company,
                        password
                    }:
                    {
                        firstName: string,
                        lastName: string,
                        email: string,
                        company: Company,
                        password: string
                    }
                ) => this.userService.createUser({
                    firstName,
                    lastName,
                    email,
                    company,
                    password
                    })
                    .pipe(
                        map((user: User) => successCreatingUser({ user })),
                        catchError(error => of(errorCreatingUser(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private companyService: CompanyService
    ) {}
}
