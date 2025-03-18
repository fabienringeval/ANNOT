import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models';

// load users

export const loadingUserList = createAction('[Add Users] Loading users');

export const successLoadingUserList = createAction(
    '[Add Users] Success loading users',
    props<{ users: User[] }>()
);

export const errorLoadingUserList = createAction(
    '[Add Users] Error loading users',
    props<{ error: any }>()
);

// add users

export const addingUsers = createAction(
    '[Add Users] Adding users',
    props<{ campaignId: number, users: User[] }>()
);

export const successAddingUsers = createAction('[Add Users] Success adding users');

export const errorAddingUsers = createAction(
    '[Add Users] Error adding users',
    props<{ error: any }>()
);