import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    deletingCompany,
    successDeletingCompany,
    errorDeletingCompany
} from './delete-company.actions';
import { CompanyService } from 'src/app/core/http';


@Injectable()
export class DeleteCompanyEffects {
    loadingCompanyList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletingCompany),
            exhaustMap(
                ({ companyId }: { companyId: number }) => this.companyService.deleteCompany({ companyId })
                    .pipe(
                        map(() => successDeletingCompany()),
                        catchError(error => of(errorDeletingCompany(error)))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private companyService: CompanyService
    ) {}
}
