import { createAction, props } from '@ngrx/store';

// Load emotions

export const loggingOut = createAction('[Logout] Logging out');

export const successLoggingOut = createAction('[Logout] Success logging out');

export const errorLoggingOut = createAction(
    '[Logout] Error logging out',
    props<{ error: any }>()
);

// Load emotions

export const removingTokens = createAction('[Logout] Removing tokens');