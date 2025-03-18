import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models';

/**
 * Load user
 */

export const loadingUser = createAction('[Self] Loading user');

export const successLoadingUser = createAction(
    '[Self] Success loading user',
    props<{ user: User }>()
);

export const errorLoadingUser = createAction(
    '[Self] Error loading user',
    props<{ error: any }>()
);

/**
 * Reset connexion removing current user
 */
export const reset = createAction('[Self] Remove current user');
