import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    loadingRole,
    successLoadingRole,
    errorLoadingRole
} from './role.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RoleService } from '../../http/role/role.service';

@Injectable()
export class RoleEffects {
    loadingRole$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadingRole),
            switchMap(() =>
                this.roleService.getSelfRoles()
                .pipe(
                    map(({ roles, modules }) => successLoadingRole({ roles, modules })),
                    catchError(error => of(errorLoadingRole({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private roleService: RoleService
    ) {}
}
