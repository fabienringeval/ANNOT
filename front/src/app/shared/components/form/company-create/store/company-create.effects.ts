import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    creatingCompany,
    successCreatingCompany,
    errorCreatingCompany
} from './company-create.actions';
import { Company } from 'src/app/shared/models';
import { CompanyService } from 'src/app/core/http';


@Injectable()
export class CreateCompanyEffects {
    creatingCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(creatingCompany),
            exhaustMap(
                (
                    {
                        name,
                        description
                    }:
                    {
                        name: string,
                        description: string
                    }
                ) => this.companyService.createCompany({
                    name,
                    description
                    })
                    .pipe(
                        map((company: Company) => successCreatingCompany({ company })),
                        catchError(error => of(errorCreatingCompany(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private companyService: CompanyService
    ) {}
}
