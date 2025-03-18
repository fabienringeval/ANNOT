import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    loadingCompanyList,
    successLoadingCompanyList,
    errorLoadingCompanyList
} from './company-list.actions';
import { CompanyService } from 'src/app/core/http';
import { Company } from 'src/app/shared/models';
import { Pagination } from 'src/app/shared/interfaces';


@Injectable()
export class LoadCompanyListEffects {
    loadingUserList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingCompanyList),
            exhaustMap(
                (
                    { pagination  }:
                    { pagination: Pagination }) =>
                    this.companyService.loadCompanyList({ pagination })
                    .pipe(
                        map(({ companies, total }: { companies: Company[], total: number }) =>
                            successLoadingCompanyList({ companies, total })),
                        catchError(error => of(errorLoadingCompanyList(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private companyService: CompanyService
    ) {}
}
