import { createAction, props } from '@ngrx/store';
import { Role, Module } from 'src/app/shared/models';

/**
 * Logging in
 */

export const loadingRole = createAction('[Self] Loading Role');

export const successLoadingRole = createAction(
    '[Self] Success loading Role',
    props<{ roles: Role[], modules: Module[] }>()
);

export const errorLoadingRole = createAction(
    '[Self] Error loading role',
    props<{ error: object }>()
);

/**
 * Reset
 */

export const reset = createAction('[Self] Reset roles');
