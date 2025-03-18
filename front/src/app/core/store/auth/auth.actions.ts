import { createAction, props } from '@ngrx/store';

/**
 * Log in
 */

export const logging = createAction(
    '[Auth] Logging',
    props<{ username: string, password: string }>()
);

export const successLogging = createAction(
    '[Auth] Logged',
    props<{ access_token: string, refresh_token: string }>()
);

export const errorLogging = createAction(
    '[Auth] Error logging',
    props<{ error: any }>()
);

export const successSavingTokens = createAction(
    '[Auth] Logged',
    props<{ access_token: string, refresh_token: string }>()
);

export const errorSavingTokens = createAction(
    '[Auth] Error logging',
    props<{ error: any }>()
);
