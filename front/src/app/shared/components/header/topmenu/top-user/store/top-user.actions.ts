import { createAction, props } from '@ngrx/store';

// Load User List

export const loadingUserInfo = createAction('[Top User] Loading user info');

export const successLoadingUserInfo = createAction(
    '[Top User] Success loading user info',
    props<{ firstName: string, lastName: string }>()
);

export const errorLoadingUserInfo = createAction(
    '[Top User] Error loading user info',
    props<{ error: any }>()
);
